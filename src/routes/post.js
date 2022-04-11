const express = require('express')
const { feed, createDraft, getPostById, publishDraft, addPostToCategory } = require('../controllers/post')
const router = express.Router()

router.get('/feed', feed)

router.post('/post', createDraft)

router.get('/post/:id', getPostById)

router.post('/post/:id')

router.put('/post/:id', publishDraft)

router.put('/post/:id/:categoryId', addPostToCategory)


module.exports = router