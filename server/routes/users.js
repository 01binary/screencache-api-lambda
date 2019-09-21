const express = require('express')
const posts = require('./posts')
const users = express.Router()

users.get('/', (req, res) => {})

users.get('/:userId', (req, res) => {})

users.use('/:userId/posts', (req, res, next) => {
    req.userId = req.params.userId;
    next()
}, posts)

module.exports = users