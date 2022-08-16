"use strict";

// asset-input/test/cdk-test-integration/functions/functions.js
var AWS = require("aws-sdk");
AWS.config.update({ region: "REGION" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
var params = {
  TableName: "CUSTOMER_LIST",
  Item: {
    "CUSTOMER_ID": { N: "001" },
    "CUSTOMER_NAME": { S: "Richard Roe" }
  }
};
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
