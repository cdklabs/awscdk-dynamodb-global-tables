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
      replicas: [{
        region: 'us-east-1',
      },
      {
        region: 'us-west-1',
      },
      {
        region: 'us-west-2',
      }],
      tableName: 'with_replica_table_name',
    });
    /*
    const write_function_name = 'write_into_ddb';
    const write_function = new NodejsFunction(this, write_function_name, {
      functionName: write_function_name,
      runtime: Runtime.NODEJS_14_X,
      entry: '/Users/tianyiwu/awscdk-dynamodb-global-tables/test/cdk-test-integration/functions/writeFunction.js',
      handler: 'handler',
      environment: {
        HELLO_TABLE_NAME: my_table.tableName,
      },
    });
    my_table.grantWriteData(write_function);
    */
    const read_function_name = 'read_from_ddb';
    const read_function = new NodejsFunction(this, read_function_name, {
      functionName: read_function_name,
      runtime: Runtime.NODEJS_14_X,
      entry: '/Users/tianyiwu/awscdk-dynamodb-global-tables/test/cdk-test-integration/functions/readFunction.js',
      handler: 'handler',
      environment: {
        HELLO_TABLE_NAME: my_table.tableName,
      },
    });
    my_table.grantReadData(read_function);
    //my_table.grantReadData(my_function);
    //my_table.grantReadWriteData(my_function);
  }
}
