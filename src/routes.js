const express = require('express')
const { feed, createDraft, getPostById, publishDraft, addPostToCategory, createCategory } = require('./controllers/post')
const { createUser, setUserBio, getAllAuthors } = require('./controllers/user')
const router = express.Router()

/** 
 * Post routes
*/
router.get('/feed', feed)

router.post('/post', createDraft)

router.get('/post/:id', getPostById)

router.put('/post/:id', publishDraft)

router.put('/post/:id/:categoryId', addPostToCategory)

/**
 * user routes
 */

router.get('/authors', getAllAuthors)

router.post('/user', createUser)

router.post('/author/:id/profile', setUserBio)

/** Category routes */

router.post('/category', createCategory)

module.exports = router