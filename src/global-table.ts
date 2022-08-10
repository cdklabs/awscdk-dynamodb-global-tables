import { IResource, Resource, aws_dynamodb, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface IGlobalTable extends IResource {
}

abstract class GlobalTableBase extends Resource implements IGlobalTable {
}

export interface GlobalTableProps {
  readonly partitionKey: aws_dynamodb.Attribute;
}

export class GlobalTable extends GlobalTableBase {

  constructor(scope: Construct, id: string, props: GlobalTableProps) {
    super(scope, id);
    new aws_dynamodb.CfnGlobalTable(this, 'cfnglobaltable_for_demo', {
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
  }
}