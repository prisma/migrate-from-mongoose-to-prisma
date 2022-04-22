const post = require('../models/post')
const User = require('../models/user')

/**
 * POST /user
 * name: string - optional
 * email: string - required
 */
const createUser = async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await User.create({
      name,
      email,
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

    if (!user) return res.status(404).json({ message: 'Author not found' })

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getAuthors = async (req, res) => {
  try {
    const users = await User.find({}).populate({ path: 'posts', model: post })

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  createUser,
  setUserBio,
  getAuthors
}
