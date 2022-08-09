import { IResource, Resource, aws_dynamodb, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { CfnGlobalTable } from 'aws-cdk-lib/aws-dynamodb';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface IGlobalTable extends IResource {
}

abstract class GlobalTableBase extends Resource implements IGlobalTable {
}

export interface GlobalTableProps {
  readonly partitionKey: aws_dynamodb.Attribute;
  readonly role?: IRole;
}


export class GlobalTable extends GlobalTableBase {

  constructor(scope: Construct, id: string, props: GlobalTableProps) {
    super(scope, id);
    const current_stack = Stack.of(scope);
    new CfnGlobalTable(this, 'cfnglobaltable_for_demo', {
      attributeDefinitions: [{
        attributeName: props.partitionKey.name,
        attributeType: props.partitionKey.type,
      }],
      billingMode: 'PAY_PER_REQUEST',
      keySchema: [{
        attributeName: props.partitionKey.name,
        // because we only need partitionkey but not sortkey so it would be 'HASH'
        keyType: 'HASH',
      }],
      // use current stack's region
      replicas: [{
        region: current_stack.region,
      }],
    }).applyRemovalPolicy(RemovalPolicy.RETAIN);;
  }
}