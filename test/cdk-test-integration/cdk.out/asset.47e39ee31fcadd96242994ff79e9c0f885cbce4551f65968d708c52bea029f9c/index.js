"use strict";

// asset-input/test/cdk-test-integration/functions/writeFunction.js
var AWS = require("aws-sdk");
var TABLE_NAME = process.env.HELLO_TABLE_NAME;
exports.handler = async (event, context) => {
  const dbClient = new AWS.DynamoDB({ region: "us-east-1" });
  try {
    var params = {
      TableName: TABLE_NAME,
      Item: {
        "id": { S: "id" },
        "customer_name": { S: "Tianyi" }
      }
    };
    await dbClient.putItem(params).promise();
    console.log("success");
  } catch (err) {
    console.error(err);
  }
};
