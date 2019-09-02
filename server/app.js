'use strict'

const express = require('express')
const serverless = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes');
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(serverless.eventContext())

app.use('/', routes.auth)
app.use('/users', routes.users)
app.use('/posts', routes.posts)

app.use(routes.notFound)

module.exports = app
