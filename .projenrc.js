const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services',
  description: 'L2 Construct Library for DynamoDB Global Tables',
  cdkVersion: '2.35.0',
  defaultReleaseBranch: 'main',
  name: 'awscdk-dynamodb-global-tables',
  repositoryUrl: 'https://github.com/cdklabs/awscdk-dynamodb-global-tables.git',
  stability: 'experimental',
  autoApproveUpgrades: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  pullRequestTemplateContents: [
    '',
    '----',
    '',
    '* [ ] This PR includes unit tests to verify the change.',
    '* [ ] This PR adds to the cdk-test-integration CDK app to verify the change in this PR.',
    '* [ ] Did you run `cdk deploy` on the cdk-test-integration CDK app?',
  ],
});

project.synth();
