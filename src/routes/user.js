const express = require('express')
const { createUser, setUserBio } = require('../controllers/user')
const router = express.Router()

router.get('/authors')

router.post('/user', createUser)

router.post('/author/:id/profile', setUserBio)

module.exports = router