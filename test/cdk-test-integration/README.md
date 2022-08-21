# this CDK app exists within the construct library to act as an integration test

The CDK app deploys the minimum props of GlobalTable. 
The output could be check in file `CdkTestIntegrationStack.template.json` that is located at: awscdk-dynamodb-global-tables/test/cdk-test-integration/cdk.out/

Commands used to ran the integration test app:
`yarn build`
`cdk synth`
`cdk deploy`

