import { IResource, RemovalPolicy, Resource, Stack } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface IGlobalTable extends IResource {
}

abstract class GlobalTableBase extends Resource implements IGlobalTable {
}

export interface GlobalTableProps {
  readonly partitionKey: ddb.Attribute;
}

export class GlobalTable extends GlobalTableBase {

  constructor(scope: Construct, id: string, props: GlobalTableProps) {
    super(scope, id);
    new ddb.CfnGlobalTable(this, 'Resource', {
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