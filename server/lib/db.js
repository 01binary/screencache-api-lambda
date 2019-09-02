const AWS = require('aws-sdk');
const package = require('../../package.json')

AWS.config.update({region: package['aws-region']});

module.exports = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
