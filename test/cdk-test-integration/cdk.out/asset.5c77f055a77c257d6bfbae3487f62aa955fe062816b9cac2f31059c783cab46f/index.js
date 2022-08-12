"use strict";

// asset-input/test/cdk-test-integration/functions/functions.js
var AWS = require("aws-sdk");
exports.handler = async (event, context) => {
  dbClient = new AWS.DynamoDB({ region: "us-west-2" });
  const run = async () => {
    try {
      var params = {
        TableName: "Customer_List",
        Item: {
          "id": "001",
          "customer_name": "Tianyi"
        }
      };
      ddb.putItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });
      run();
    } catch (err) {
      console.error(err);
    }
  };
};
