const express = require('express')
const { feed, createDraft, getPostById, publishDraft, addPostToCategory } = require('./controllers/post')
const { createUser, setUserBio, getAuthors } = require('./controllers/user')
const { createCategory } = require('./controllers/post')
const router = express.Router()

/** 
 * Post routes
 */

/**
 * filter is now handled by /feed
 */
router.get('/feed', feed)

router.post('/post', createDraft)

router.get('/post/:id', getPostById)

router.put('/post/:id', publishDraft)

router.put('/post/:id/:categoryId', addPostToCategory)

/**
 * user routes
 */

router.get('/authors', getAuthors)

router.post('/user', createUser)

router.post('/author/:id/profile', setUserBio)

/** Category routes */

router.post('/category', createCategory)

module.exports = router