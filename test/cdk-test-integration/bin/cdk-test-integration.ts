#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkTestIntegrationStack } from '../lib/cdk-test-integration-stack';

const app = new cdk.App();
new CdkTestIntegrationStack(app, 'CdkTestIntegrationStack', {
});