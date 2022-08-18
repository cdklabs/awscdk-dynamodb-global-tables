import { IResource, RemovalPolicy, Resource } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as perms from './perms';

export interface IGlobalTable extends IResource {
  grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant;
  grantReadData(grantee: iam.IGrantable): iam.Grant;
  grantWriteData(grantee: iam.IGrantable): iam.Grant;
  grantReadWriteData(grantee: iam.IGrantable): iam.Grant;
}

abstract class GlobalTableBase extends Resource implements IGlobalTable {
  public abstract readonly tableArn: string;
  protected readonly regionalArns = new Array<string>();
  public abstract readonly tableName: string;
  public grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee,
      actions,
      resourceArns: [
        this.tableArn,
      ],
      scope: this,
    });
  }

  public grantReadData(identity: iam.IGrantable): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee: identity,
      actions: perms.READ_DATA_ACTIONS.concat(perms.DESCRIBE_TABLE), // ['s3:Get*']as many actions as you need
      resourceArns: [this.tableArn],
    });
  }

  public grantWriteData(grantee: iam.IGrantable): iam.Grant {
    //const tableActions = perms.WRITE_DATA_ACTIONS.concat(perms.DESCRIBE_TABLE);
    //const keyActions = perms.KEY_READ_ACTIONS.concat(perms.KEY_WRITE_ACTIONS);
    //return this.combinedGrant(grantee, { keyActions, tableActions });
    return iam.Grant.addToPrincipal({
      grantee,
      actions: perms.WRITE_DATA_ACTIONS.concat(perms.DESCRIBE_TABLE),
      resourceArns: [this.tableArn],
    });
  }

  public grantReadWriteData(grantee: iam.IGrantable): iam.Grant {
    //const tableActions = perms.READ_DATA_ACTIONS.concat(perms.WRITE_DATA_ACTIONS).concat(perms.DESCRIBE_TABLE);
    //const keyActions = perms.KEY_READ_ACTIONS.concat(perms.KEY_WRITE_ACTIONS);
    //return this.combinedGrant(grantee, { keyActions, tableActions });
    return iam.Grant.addToPrincipal({
      grantee,
      actions: perms.READ_DATA_ACTIONS.concat(perms.WRITE_DATA_ACTIONS).concat(perms.DESCRIBE_TABLE),
      resourceArns: [this.tableArn],
    });
  }

}

export interface GlobalTableProps {
  readonly partitionKey: ddb.Attribute;
  readonly replicas ?: Replica[];
  readonly tableName ?: string;
}

export interface Replica {
  readonly region: string;
}

export class GlobalTable extends GlobalTableBase {
  public readonly tableArn: string;
  public readonly tableName: string;
  public readonly replicateregions: Replica[] = [];
  constructor(scope: Construct, id: string, props: GlobalTableProps) {
    super(scope, id);
    // add current region into table props replicas ?, so the default value would be the current(stack) region
    this.replicateregions.push({ region: this.env.region });//Token.asString(this.env.region) });
    // add possible multiple replicas
    if (props.replicas !== undefined) {
      props.replicas?.forEach((eachRegion) => {
        this.replicateregions.push({ region: eachRegion.region });
      });
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
      streamSpecification: {
        streamViewType: 'KEYS_ONLY',
      },
      replicas: props.replicas ?? this.replicateregions.map((regions) => {
        return {
          region: regions.region,
        };
      }),
      tableName: props.tableName ?? 'default_name',
    });
    resource.applyRemovalPolicy(RemovalPolicy.DESTROY);
    this.tableArn = this.getResourceArnAttribute(resource.attrArn,
      {
        service: 'dynamodb',
        resource: 'GlobalTable',
        resourceName: this.physicalName,
      },
    );
    this.tableName = this.getResourceNameAttribute(resource.ref);
  }
}