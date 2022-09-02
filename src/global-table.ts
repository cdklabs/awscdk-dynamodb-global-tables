import { IResource, RemovalPolicy, Resource, Stack, Token } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as perms from './perms';

export interface IGlobalTable extends IResource {

  /**
   * Adds an IAM policy statement associated with this table to an IAM
   * principal's policy.
   * @param grantee The principal
   * @param actions The set of actions to allow (i.e. "dynamodb:PutItem", "dynamodb:GetItem", ...)
   */
  grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant;

  /**
   * Permits an IAM principal all data read operations from this table:
   * BatchGetItem, Query, GetItem, Scan, ConditionCheckItem, DescribeTable.
   * @param grantee The principal to grant access to
   */
  grantReadData(grantee: iam.IGrantable): iam.Grant;

  /**
   * Permits an IAM principal all data write operations to this table:
   * PutItem.
   *
   * Appropriate grants will also be added to the customer-managed KMS key
   * if one was configured.
   *
   * @param grantee The principal to grant access to
   */
  grantWriteData(grantee: iam.IGrantable): iam.Grant;

  /**
   * Permits an IAM principal to all data read/write operations to this table.
   * BatchGetItem, Query, GetItem, Scan, ConditionCheckItem, DescribeTable,
   * PutItem
   *
   * Appropriate grants will also be added to the customer-managed KMS key
   * if one was configured.
   *
   * @param grantee The principal to grant access to
   */
  grantReadWriteData(grantee: iam.IGrantable): iam.Grant;

}

export enum TableEncryption {
  /**
   * Server-side KMS encryption with a master key owned by AWS.
   */
  DEFAULT = 'AWS_OWNED',

  /**
   * Server-side KMS encryption with a customer master key managed by customer.
   * If `encryptionKey` is specified, this key will be used, otherwise, one will be defined.
   *
   * > **NOTE**: if `encryptionKey` is not specified and the `Table` construct creates
   * > a KMS key for you, the key will be created with default permissions. If you are using
   * > CDKv2, these permissions will be sufficient to enable the key for use with DynamoDB tables.
   * > If you are using CDKv1, make sure the feature flag `@aws-cdk/aws-kms:defaultKeyPolicies`
   * > is set to `true` in your `cdk.json`.
   */
  CUSTOMER_MANAGED = 'CUSTOMER_MANAGED',

  /**
   * Server-side KMS encryption with a master key managed by AWS.
   */
  AWS_MANAGED = 'AWS_MANAGED',
}

abstract class GlobalTableBase extends Resource implements IGlobalTable {
  public abstract readonly tableArn: string;
  public abstract readonly tableName: string;
  public abstract readonly encryption: TableEncryption;

  protected readonly regionalArns = new Array<string>();
  public grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee,
      actions,
      resourceArns: [
        this.tableArn,
        ...this.regionalArns,
      ],
      scope: this,
    });
  }

  public grantReadData(identity: iam.IGrantable): iam.Grant {
    return this.grant(identity, ...perms.READ_DATA_ACTIONS.concat(perms.DESCRIBE_TABLE));
  }

  public grantWriteData(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, ...perms.WRITE_DATA_ACTIONS.concat(perms.DESCRIBE_TABLE));
  }

  public grantReadWriteData(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, ...perms.READ_DATA_ACTIONS.concat(perms.WRITE_DATA_ACTIONS).concat(perms.DESCRIBE_TABLE));
  }
}

export interface GlobalTableProps {
  readonly partitionKey: ddb.Attribute;
  readonly replicas?: Replica[];
  readonly tableName?: string;
  readonly encryption?: TableEncryption;
}

export interface Replica {
  readonly region: string;
}

export class GlobalTable extends GlobalTableBase {
  public readonly tableArn: string;
  public readonly tableName: string;
  public readonly replicateregions: Replica[] = [];
  public readonly encryption: TableEncryption = TableEncryption.DEFAULT;
  // by default, it is set to fasle to have serverside encrption
  public readonly serverSideEncryption: boolean = false;
  constructor(scope: Construct, id: string, props: GlobalTableProps) {
    super(scope, id, {
      physicalName: props.tableName,
    });
    // add validations for tableName
    if (props.tableName !== undefined &&
      !Token.isUnresolved(props.tableName) &&
      !/^[_a-zA-Z]+$/.test(props.tableName)) {
      throw new Error('tableName must be non-empty and contain only letters and underscores, ' +
      `got: '${props.tableName}'`);
    }
    if (props.replicas !== undefined) {
      props.replicas?.forEach((eachRegion) => {
        this.replicateregions.push({ region: eachRegion.region });
        // add validations for replicas
        if (eachRegion.region === Stack.of(scope).region) {
          throw new Error('replicate region cannot be the same as stack region' +
        `got: '${eachRegion.region}'`);
        };
      });
      // validation passed so then add the stack's region
      this.replicateregions.push({ region: this.env.region });
    } else {
      // add current region into table props replicas ?, so the default value would be the current(stack) region
      this.replicateregions.push({ region: this.env.region });
    }

    // if encryption is specified
    if (props.encryption !== undefined) {
      // user can also specify the encryption type as defaut (check readme part)
      if (props.encryption === TableEncryption.DEFAULT) {
        // sse become false to enable default serverside encryption
        this.serverSideEncryption = false;
      }
      if (props.encryption === TableEncryption.AWS_MANAGED) {
        this.serverSideEncryption = true;
      }
      if (props.encryption === TableEncryption.CUSTOMER_MANAGED) {
        this.serverSideEncryption = true;
      }
    } else {
      // sse become false to enable default serverside encryption
      this.serverSideEncryption = false;
    }


    const resource = new ddb.CfnGlobalTable(this, 'Resource', {
      attributeDefinitions: [{
        attributeName: props.partitionKey.name,
        attributeType: props.partitionKey.type,
      }],
      billingMode: 'PAY_PER_REQUEST',
      keySchema: [{
        attributeName: props.partitionKey.name,
        keyType: 'HASH',
      }],
      // need to modify as changed by user sepcifed or not
      sseSpecification: {
        sseEnabled: this.serverSideEncryption,
        sseType: props.encryption,
      },
      streamSpecification: {
        streamViewType: 'KEYS_ONLY',
      },
      replicas: this.replicateregions.map((regions) => {
        return {
          region: regions.region,
        };
      }),
      tableName: this.physicalName,
    });


    resource.applyRemovalPolicy(RemovalPolicy.DESTROY);
    this.tableArn = this.getResourceArnAttribute(resource.attrArn,
      {
        service: 'dynamodb',
        resource: 'GlobalTable',
        resourceName: this.physicalName,
      },
    );
    // everytime loop through the replicateregions, put current into the regionalArns
    this.replicateregions.forEach((eachRegion) => {
      if (eachRegion.region !== Stack.of(scope).region) {
        this.regionalArns.push(Stack.of(this).formatArn({
          region: eachRegion.region,
          service: 'dynamodb',
          resource: 'table',
          resourceName: this.getResourceNameAttribute(resource.ref),
        }));
      }
    });
    // everytime loop through the replicateregions, put current into the regionalArns
    this.tableName = this.getResourceNameAttribute(resource.ref);
  }
}