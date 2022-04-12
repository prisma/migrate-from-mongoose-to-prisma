const post = require('../models/post')
const User = require('../models/user')

/**
 * POST /user
 * name: string - optional
 * email: string - required
 */
const createUser = async (req, res) => {
  const { name, email, bio } = req.body

  try {
    const user = await User.create({
      name,
      email,
      /** 
       * set default value of embedded document to null if no value is provided
      */
      profile: bio !== undefined ? {
        bio
      } : null
    })

    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

/**
 * POST /user/:userId/profile
 *
 * req body
 * bio: string - required
 */
const setUserBio = async (req, res) => {
  const { id } = req.params
  const { bio } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { profile: { bio } },
      { new: true }
    )

    return res.json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getAuthors = async (req, res) => {
  const users = await User.find({}).populate({ path: 'posts', model: post })

  return res.json(users)
}

module.exports = {
  createUser,
  setUserBio,
  getAuthors
}