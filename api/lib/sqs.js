const AWS = require('./aws');

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html
module.exports = new AWS.SQS({apiVersion: '2012-11-05'});
