const express = require('express')
const {
    validateNickname,
    validateUsername,
    validatePassword 
} = require('../services/accountsService')
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

account.post('/validate', (req, res, next) => {
    const {
        nickname,
        username,
        password
    } = req.body

    Promise
        .all([
            nickname && validateNickname(nickname)
                .then(nickname_result => ({ nickname_result })),
            username && validateUsername(username)
                .then(username_result => ({ username_result })),
            password && validatePassword(password)
                .then(password_result => ({ password_result }))
        ])
        .then(results => res.send(
            results.reduce((prev, cur) => ({ ...prev, ...cur }))))
        .catch(next)
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
