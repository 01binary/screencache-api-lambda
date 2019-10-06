const db = require('../lib/db')
const table = { TableName: 'screencache-posts' }

module.exports = {
    getPost: ({ postId }) => new Promise((resolve, reject) => (
        db.get(
            {
                ...table,
                Key: {
                    post_id: postId
                }
            },
            (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data)
            })
    )),

    getPostsByUser: ({ userId }) => new Promise((resolve, reject) => (
        db.query(
            {
                ...table,
                KeyConditionExpression: 'user_id = :byUser',
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
    ))
}
