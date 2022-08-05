
import { StackProps, aws_dynamodb } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { GlobalTable } from '../src/GlobalTable';

// create cdk stack with specific region
// create a globaltable within the stack
// use assertioin lib validate region of the replica, send a pr.
test('hello', () => {
  const app = new cdk.App();
  const newstack = new cdk.Stack(app);
  new GlobalTable(newstack, 'hello', {
    partitionKey:
    {
      name: 'id',
      type: ddb.AttributeType.STRING,
    },
  },
  );
  // testing purpose
  const template = Template.fromStack(newstack);
  template.resourceCountIs('AWS::DynamoDB::GlobalTable', 1);

});

// GlobalTable at 'hello' should be created in the scope of a Stack, but no Stack found
// why?
// Therefore, I create the Stack here.
export interface GlobalTableStackProps extends StackProps {
  region?: string;
  partitionKey: aws_dynamodb.Attribute;
}


/*
test('hello', () => {
  const app = new cdk.App();
  new GlobalTableStack(app, 'hello', {
    partitionKey:
    {
      name: 'id',
      type: ddb.AttributeType.STRING,
    },
  });
});
*/