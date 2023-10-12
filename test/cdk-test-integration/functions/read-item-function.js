var AWS = require('aws-sdk');
var TABLE_NAME = process.env.HELLO_TABLE_NAME;
exports.handler = async (event, context) => {
  const dbClient = new AWS.DynamoDB({ region: "us-east-1" });
    try{
      var params = {
        TableName: TABLE_NAME,
        Key: {
          'id': { S: 'id'},
        }
      };
      await dbClient.getItem(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
      }).promise();
    } catch (err) {
      console.error(err);
    }
}  
