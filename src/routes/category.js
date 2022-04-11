const express = require('express')
const { createCategory } = require('../controllers/post')
const router = express.Router()

router.post('/category', createCategory)

module.exports = router