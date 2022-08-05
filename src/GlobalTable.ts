/*
 * We always import other construct libraries entirely with a prefix -
 * we never import individual classes from them without a qualifier
 * (the prefix makes it more obvious where a given dependency comes from,
 * and prevents conflicting names causing issues).
 * Our linter also enforces ES6-style imports -
 * we don't use TypeScript's import a = require('a') imports.
 */
import { IResource, Resource, aws_dynamodb, RemovalPolicy } from 'aws-cdk-lib';
import { CfnGlobalTable } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
// for files that are part of this package, we do import individual classes or functions


export interface IGlobalTable extends
  // all L2 interfaces need to extend IResource
  IResource {

}


abstract class GlobalTableBase extends Resource implements IGlobalTable {

}

/**
 * Implement the {@link IExampleResource.onEvent} method.
 * Notice that we change 'options' from an optional argument to an argument with a default value -
 * that's a common trick in the CDK
 * (you're not allowed to have default values for arguments in interface methods in TypeScript),
 * as it simplifies the implementation code (less branching).
 */


export interface GlobalTableProps {
  readonly partitionKey: aws_dynamodb.Attribute;
}


export class GlobalTable extends GlobalTableBase {

  constructor(scope: Construct, id: string, props: GlobalTableProps) {
    super(scope, id);
    new CfnGlobalTable(this, 'cfnglobaltable_for_demo', {
      attributeDefinitions: [{
        attributeName: props.partitionKey.name,
        attributeType: props.partitionKey.type,
      }],
      billingMode: 'PAY_PER_REQUEST',
      keySchema: [{
        attributeName: props.partitionKey.name,
        keyType: props.partitionKey.type,
      }],
      // use region of current stack
      // 1. create extra props to fill in but it deviates the final format on the milestone
      // 2. fetch from the stack, stack should have place(interface) to read from input.
      replicas: [{
        region: 'us-east-1',
      }],
    }).applyRemovalPolicy(RemovalPolicy.RETAIN);;
  }
}