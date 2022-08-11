import { IResource, RemovalPolicy, Resource, Stack } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as perms from './perms';

export interface IGlobalTable extends IResource {
  grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant;
  grantReadData(grantee: iam.IGrantable): iam.Grant;
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
    // usually, we would grant some service-specific permissions here,
    // but since this is just an example, let's use S3
    return iam.Grant.addToPrincipal({
      grantee: identity,
      actions: perms.READ_DATA_ACTIONS.concat(perms.DESCRIBE_TABLE), // ['s3:Get*']as many actions as you need
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
    }).applyRemovalPolicy(RemovalPolicy.RETAIN);;
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