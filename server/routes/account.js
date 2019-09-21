const express = require('express')
const account = express.Router()

account.get('/', (req, res) => {
    res.send({
        csrf_token: req.csrfToken(),
        user: null
    })
})

account.put('/', (req, res) => {

})

account.delete('/', (req, res) => {

})

account.post('/validate', (req, res) => {
    const {
        nickname,
        username,
        password
    } = req.body;

    // Validate nickname uniqueness by checking Cognito or DynamoDB

    // Validate username uniqueness by checking Cognito or DynamoDB

    // Validate password strength by using ZXCVBN

    res.send({
        username_valid: false,
        nickname_valid: false,
        password_valid: false
    });
})

account.post('/signup', (req, res) => {
    
})

account.post('/login', (req, res) => {
    res.json({
        success: true
    })
})

account.post('/logout', (req, res) => {
    res.json({
        success: true
    })
})

account.post('/change-password', (req, res) => {

})

account.post('/recover-password', (req, res) => {
})

account.post('/reset-password', (req, res) => {

})

module.exports = account
