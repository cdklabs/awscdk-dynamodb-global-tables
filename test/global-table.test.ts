import { App, Stack } from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
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
      Region: 'us-east-1',
    }],
  });
});

test('Create global table with partition key and specified replica, tablename', () => {
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
    replicas: [{
      region: newstack.region,
    },
    {
      region: 'us-west-1',
    },
    {
      region: 'us-west-2',
    }],
    tableName: 'test_purpose',
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
    },
    {
      Region: 'us-west-1',
    },
    {
      Region: 'us-west-2',
    }],
    TableName: 'test_purpose',
  });
});

test('"grant" allows adding arbitrary actions associated with this table resource (via testGrant)', () => {
  testGrant(
    ['action1', 'action2'], (p, t) => t.grant(p, 'dynamodb:action1', 'dynamodb:action2'));
});

test('"grantReadData" allows the principal to read data from the table', () => {
  testGrant(
    ['BatchGetItem', 'Query', 'GetItem', 'Scan', 'ConditionCheckItem', 'DescribeTable'], (p, t) => t.grantReadData(p));
});

test('"grantWriteData" allows the principal to write data to the table', () => {
  testGrant(
    ['PutItem', 'DescribeTable'], (p, t) => t.grantWriteData(p));
});

test('"grantReadWriteData" allows the principal to read/write data', () => {
  testGrant([
    'BatchGetItem', 'Query', 'GetItem', 'Scan',
    'ConditionCheckItem', 'DescribeTable', 'PutItem',
  ], (p, t) => t.grantReadWriteData(p));
});

function testGrant(expectedActions: string[], invocation: (user: iam.IPrincipal, table: GlobalTable) => void) {
  // GIVEN
  const app = new App();
  const stack = new Stack(app);
  const table = new GlobalTable(stack, 'my-table', {
    partitionKey: {
      name: 'id', type: ddb.AttributeType.STRING,
    },
    replicas: [{
      region: 'us-east-2',
    },
    {
      region: 'us-west-1',
    }],
  });
  const user = new iam.User(stack, 'user');

  // WHEN
  invocation(user, table);

  // THEN
  const action = expectedActions.length > 1 ? expectedActions.map(a => `dynamodb:${a}`) : `dynamodb:${expectedActions[0]}`;
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: action,
          Effect: 'Allow',
          Resource: {
            'Fn::GetAtt': [
              'mytable0324D45C',
              'Arn',
            ],
          },
        },
      ],
    },
    PolicyName: 'userDefaultPolicy083DF682',
    Users: [
      {
        Ref: 'user2C2B57AE',
      },
    ],
  });
}
