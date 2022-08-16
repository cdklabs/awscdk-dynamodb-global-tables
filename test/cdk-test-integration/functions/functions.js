var AWS = require('aws-sdk');
const TABLE_NAME = process.env.HELLO_TABLE_NAME;
exports.handler = async (event, context) => {
  const dbClient = new AWS.DynamoDB({ region: "us-west-2" });
    try{
      var params = {
        TableName: TABLE_NAME,
        Item: {
          'id': { N: '001'},
          'customer_name': { S: 'Tianyi'},
        }
      };
      await dbClient.putItem(params).promise();
    } catch (err) {
      console.error(err);
    }
}