import { Stack, StackProps } from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { GlobalTable } from '../../../lib/GlobalTable';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkTestIntegrationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkTestIntegrationQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    new GlobalTable(this, 'Table', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
        // if type here be 'HASH', then it is not compatiable with type's type:
        // readonly partitionKey: aws_dynamodb.Attribute
      },
    });
  }
}
