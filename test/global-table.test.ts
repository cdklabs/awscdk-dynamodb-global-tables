import { StackProps, aws_dynamodb } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { GlobalTable } from '../src/global-table';

test('global table region is matched to stack region, when unspecified', () => {
  const region = 'us-east-1';
  const app = new cdk.App();
  const newstack = new cdk.Stack(app, 'id', {
    env: { region: region },
  });
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
  template.hasResourceProperties('AWS::DynamoDB::GlobalTable', {
    Replicas: [{
      // verify with the stack region
      Region: newstack.region,
    }],
  });

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