const prisma = require('../prisma')

/**
 * POST /user
 * name: string - optional
 * email: string - required
 */
const createUser = async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      }
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
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        profile: {
          bio,
        }
      },

    })

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const getAllAuthors = async (req, res) => {
  try {
    const authors = await prisma.user.findMany({
      include: {
        posts: true,
      }
    })

    return res.status(200).json(authors)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  createUser,
  setUserBio,
  getAllAuthors
}