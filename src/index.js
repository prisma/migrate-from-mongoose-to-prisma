require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const connect = require('./util/db')

const app = express()

const PORT = process.env.PORT || 3000

connect()

app.use('/', postRouter)
app.use('/', userRouter)
app.use('/', categoryRouter)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.listen(PORT, () => {
  console.log('🚀 Server ready at: http://localhost:3000')
})

module.exports = app;