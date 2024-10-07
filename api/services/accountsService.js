const zxcvbn = require('zxcvbn')
const AWS = require('../lib/aws')
const constants = require('../lib/constants')
const package = require('../../package.json')

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
const USER_POOL_ID = package['aws-cognito-pool-id']

const validateNicknameFormat = (nickname) => (
    nickname &&
    nickname.length > 2 &&
    nickname.length <= 24 &&
    constants.NICKNAME_PATTERN.test(String(nickname).toLowerCase())
)

const validateUsernameFormat = (username) => (
    username &&
    username.length >= 7 &&
    username.length <= 50 &&
    constants.USERNAME_PATTERN.test(String(username).toLowerCase())
)

module.exports.validateNickname = (nickname) => (
    validateNicknameFormat(nickname)
        ? cognito.listUsers(
            {
                UserPoolId: USER_POOL_ID,
                Filter: `username = "${nickname}"`,
                Limit: 1
            })
            .promise()
            .then(({ Users }) => ({ valid: Users.length === 0 }))
        : Promise.resolve({ valid: false })
)

module.exports.validateUsername = (username) => (
    validateUsernameFormat(username)
        ? cognito.listUsers(
            {
                UserPoolId: USER_POOL_ID,
                Filter: `email = "${username}"`,
                Limit: 1
            })
            .promise()
            .then(({ Users }) => ({ valid: Users.length === 0 }))
        : Promise.resolve({ valid: false})
)

module.exports.validatePassword = (password) => {
    const { score, feedback } = zxcvbn(password)
    return Promise.resolve({ valid: score > 1, score, feedback })
}
