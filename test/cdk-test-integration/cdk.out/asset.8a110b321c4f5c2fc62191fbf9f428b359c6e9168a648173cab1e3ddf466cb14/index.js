"use strict";

// asset-input/test/cdk-test-integration/functions/functions.js
var AWS = require("aws-sdk");
console.log("before handler");
exports.handler = async (event, context) => {
  console.log("in handler");
  const dbClient = new AWS.DynamoDB({ region: "us-west-2" });
  try {
    var params = {
      TableName: "Customer_List",
      Item: {
        "id": { N: "001" },
        "customer_name": { S: "Tianyi" }
      }
    };
    console.log("before putitem");
    await dbClient.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    }).promise();
  } catch (err) {
    console.error(err);
  }
};
