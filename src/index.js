require('dotenv').config()
const express = require('express')

const router = require('./routes.js')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)


app.listen(PORT, () => {
  console.log('🚀 Server ready at: http://localhost:3000')
})

module.exports = app;