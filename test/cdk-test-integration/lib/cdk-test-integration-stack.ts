import * as path from 'path';
import { aws_lambda, aws_lambda_nodejs, Stack, StackProps } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
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
    const my_function = new aws_lambda_nodejs.NodejsFunction(this, function_name, {
      functionName: function_name,
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../functions/functions.js'),
      handler: 'handler',
      environment: {
        HELLO_TABLE_NAME: my_table.tableName,
      },
    });
    //my_table.grantWriteData(my_function);
    //my_table.grantReadData(my_function);
    my_table.grantReadWriteData(my_function);
  }
}
