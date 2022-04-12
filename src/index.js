require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes.js')
const connect = require('./util/db')

const app = express()

const PORT = process.env.PORT || 3000

connect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(PORT, () => {
  console.log('🚀 Server ready at: http://localhost:3000')
})

module.exports = app;