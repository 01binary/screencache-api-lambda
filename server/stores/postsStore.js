const db = require('../lib/db')
const table = { TableName: 'screen-cache-posts' }

module.exports = {
    getPost: ({ userId, timeStamp }) => new Promise((resolve, reject) => (
        db.get(
            {
                ...table,
                Key: {
                    userId,
                    timeStamp
                }
            },
            (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data.Item)
            })
    )),

    getPostsByUser: ({ userId }) => new Promise((resolve, reject) => (
        db.query(
            {
                ...table,
                KeyConditionExpression: 'userId = :byUser',
                ExpressionAttributeValues: {
                    ':byUser': userId
                }
            },
            (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data.Items)
            }
        )
    )),

    getPostsByUserDate: ({ userId, fromMoment, toMoment }) => new Promise((resolve, reject) => (
        db.query(
            {
                ...table,
                KeyConditionExpression: 'userId = :id and #date between :from and :to',
                ExpressionAttributeNames: {
                    '#date': 'timeStamp'
                },
                ExpressionAttributeValues: {
                    ':id': userId,
                    ':from': fromMoment.unix(),
                    ':to': toMoment.unix()
                }
            },
            (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data.Items)
            }
        )
    ))
}
