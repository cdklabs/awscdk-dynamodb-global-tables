# this CDK app exists within the construct library to act as an integration test

The CDK app deploys the minimum props of GlobalTable. 
The output could be check in file `CdkTestIntegrationStack.template.json` that is located at: awscdk-dynamodb-global-tables/test/cdk-test-integration/cdk.out/

Integration test steps for grant methods:
1. deploy without any permissions, fail expected.
2. deploy with incorrect permissions(e.g.: read permission to write action), fail expected. 
3. deploy the correct permission(e.g.: write permission to write action), succeed expected.
4. deploy mix permission(e.g.: read and write permission), succeed expected.
Result checking:
To check if it works or not is based on lambda function console testing result and manually check on dynamoDB console to see if the result actually writes in.

Commands used to ran the integration test app:
`yarn build`
`cdk synth`
`cdk deploy`

