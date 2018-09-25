'use strict'
const express = require('express')
const app = express()


// Following this tutorial
// https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35



app.get('/', (req, res) => res.send('Hello world!'))

module.exports = app
