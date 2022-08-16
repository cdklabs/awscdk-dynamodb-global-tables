//import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { GlobalTable } from '../../../src';

export class CdkTestIntegrationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const my_table = new GlobalTable(this, 'Table', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    const function_name = 'write_into_ddb';
    //var tablename: string = ((my_table.tableArn).split('/', 2))[1].split('-', 3)[0];
    const my_function = new NodejsFunction(this, function_name, {
      functionName: function_name,
      runtime: Runtime.NODEJS_14_X,
      entry: '/Users/tianyiwu/awscdk-dynamodb-global-tables/test/cdk-test-integration/functions/functions.js',
      handler: 'handler',
      environment: {
        HELLO_TABLE_NAME: 'CdkTestIntegrationStack',
      },
    });
    my_table.grantWriteData(my_function);
  }
}
