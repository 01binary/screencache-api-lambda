const AWS = require('./aws');

module.exports = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
