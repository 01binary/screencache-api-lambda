'use strict'

const express = require('express')
const serverless = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const csurf = require('csurf')
const routes = require('./routes');
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(csurf({ cookie: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(serverless.eventContext()) 

app.use('/account', routes.account)
app.use('/users', routes.users)

app.use(routes.error)
app.use(routes.notFound)

module.exports = app
