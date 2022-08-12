import { IResource, RemovalPolicy, Resource, Stack } from 'aws-cdk-lib';
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
}

export class GlobalTable extends GlobalTableBase {
  public readonly tableArn: string;
  constructor(scope: Construct, id: string, props: GlobalTableProps) {
    super(scope, id);
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
      replicas: [{
        region: Stack.of(scope).region,
      }],
    });
    resource.applyRemovalPolicy(RemovalPolicy.RETAIN);
    this.tableArn = this.getResourceArnAttribute(resource.attrArn,
      //Stack.of(this).formatArn(exampleResourceArnComponents(Stack.of(scope).stackName)),
      {
        service: 'dynamodb',
        resource: 'GlobalTable',
        resourceName: this.physicalName,
      },
    );
  }
}