# this CDK app exists within the construct library to act as an integration test

The CDK app deploys the minimum props of GlobalTable. 
The output could be check in file `CdkTestIntegrationStack.template.json` that is located at: awscdk-dynamodb-global-tables/test/cdk-test-integration/cdk.out/

Commands used to ran the integration test app:
`yarn build`
`cdk synth`
`cdk deploy`

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
