var AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const dbClient = new AWS.DynamoDB({ region: "us-west-2" });
    try{
      var params = {
        TableName: 'Customer_List',
        Item: {
          'id': { N: '001'},
          'customer_name': { S: 'Tianyi'},
        }
      };
      dbClient.putItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      })
    } catch (err) {
      console.error(err);
    }
  
}