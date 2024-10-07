const AWS = require('./aws');

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html
module.exports = new AWS.SNS({ apiVersion: '2010-03-31' });
