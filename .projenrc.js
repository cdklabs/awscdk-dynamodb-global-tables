const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Tianyi-W',
  authorAddress: 'tianyiwu@amazon.com',
  cdkVersion: '2.35.0',
  defaultReleaseBranch: 'main',
  name: 'awscdk-dynamodb-global-tables',
  repositoryUrl: 'https://github.com/cdklabs/awscdk-dynamodb-global-tables.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();