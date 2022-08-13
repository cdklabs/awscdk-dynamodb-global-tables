"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// asset-input/test/cdk-test-integration/functions/functions.js
var functions_exports = {};
__export(functions_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(functions_exports);
var import_aws_sdk = require("aws-sdk");
async function handler(event, context) {
  const dbClient = new import_aws_sdk.DynamoDB({ region: "us-west-2" });
  try {
    var params = {
      TableName: "Customer_List",
      Item: {
        "id": { N: "001" },
        "customer_name": { S: "Tianyi" }
      }
    };
    dbClient.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
