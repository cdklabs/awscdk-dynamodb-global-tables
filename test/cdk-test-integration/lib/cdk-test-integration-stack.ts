import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as NodejsFunction from 'aws-cdk-lib/aws-lambda-nodejs';
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
      replicas: [{
        region: 'us-west-1',
      },
      {
        region: 'us-west-2',
      }],
    });
    const write_function_name = 'write_into_ddb';
    const my_write_function = new NodejsFunction.NodejsFunction(this, write_function_name, {
      functionName: write_function_name,
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../functions/put-item-function.js'),
      handler: 'handler',
      environment: {
        HELLO_TABLE_NAME: my_table.tableName,
      },
    });
    my_table.grantReadWriteData(my_write_function);

    const read_function_name = 'read_from_ddb';
    const my_read_function = new NodejsFunction.NodejsFunction(this, read_function_name, {
      functionName: read_function_name,
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../functions/read-item-function.js'),
      handler: 'handler',
      environment: {
        HELLO_TABLE_NAME: my_table.tableName,
      },
    });
    my_table.grantReadWriteData(my_read_function);
  }
}
