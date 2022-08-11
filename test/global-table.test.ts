import { App, Stack } from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { GlobalTable } from '../src';

test('Create global table with partition key and default properties', () => {
  const region = 'us-east-1';
  const app = new App();
  const newstack = new Stack(app, 'id', {
    env: { region: region },
  });
  new GlobalTable(newstack, 'hello', {
    partitionKey: {
      name: 'id',
      type: ddb.AttributeType.STRING,
    },
  });
  const template = assertions.Template.fromStack(newstack);
  template.resourceCountIs('AWS::DynamoDB::GlobalTable', 1);
  template.hasResourceProperties('AWS::DynamoDB::GlobalTable', {
    AttributeDefinitions: [{
      AttributeName: 'id',
      AttributeType: 'S',
    }],
    BillingMode: 'PAY_PER_REQUEST',
    KeySchema: [{
      AttributeName: 'id',
      KeyType: 'HASH',
    }],
    Replicas: [{
      Region: newstack.region,
    }],
  });
});