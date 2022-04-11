const async = require('async')

const Post = require('../models/post')
const User = require('../models/user')
const Category = require('../models/category')

/**
 * PUT /addPostToCategory
 * query string
 * postId string
 * categoryId string
 */
const addPostToCategory = async (req, res) => {
  const { id, categoryId } = req.query

  try {
    const category = await Category.findOne({ id: categoryId })

    if (!category) return res.status(404).json({ message: 'Category not found' })

    const post = await Post.findByIdAndUpdate(id, {
      categories: [ { _id: categoryId } ]
    })

    if (!post) return res.status(404).json({ message: 'Post not found' })

    return res.status(200).json(post)
  } catch (error) {
    console.log({ error })
    return res.status(500).json(error)
  }
}

/**
 * GET /feed
 * TODO: filters here...
 */
const feed = async (req, res) => {
  try {
    const feed = await Post.find({ published: true })
      .populate({ path: 'author', model: User })
      .populate('categories')

    return res.status(200).json(feed)
  } catch (error) {
    return res.status(500).json(error)

  }

}

/**
 * POST /post
 * body
 * title: string - required
 * content: string
 * authorEmail: string
 */
const createDraft = async (req, res) => {
  const { title, content, authorEmail } = req.body

  try {
    const author = await User.findOne({ email: authorEmail })

    if (!author) return res.status(404).json({ message: 'Author not found' })

    const draft = await Post.create({
      title,
      content,
      authorId: author._id,

    })

    res.status(201).json(draft)
  } catch (error) {
    return res.status(500).json(error)
  }
}

/**
 * GET
 * query string
 * searchString: string - optional
 */
// const filterPosts = async (req, res) => {
//   const { searchString } = req.query

//   try {
//     const searchedPost = await Post.findAll({
//       where: {
//         [ Op.or ]: [
//           {
//             title: {
//               [ Op.like ]: `%${searchString}%`,
//             },
//           },
//           {
//             content: {
//               [ Op.like ]: `%${searchString}%`,
//             },
//           },
//         ],
//       },
//       include: "author",
//     })

//     res.json(searchedPost)
//   } catch (error) {
//     return res.status(500).json(error)
//   }
// }

/**
 * GET /post/:id
 * query string
 * id
 */
const getPostById = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findOne({ id })
      .populate({ path: 'author', model: User })
      .populate('categories')


    return res.json(post)
  } catch (error) {
    return res.status(500).json(error)
  }
}

/**
 * PUT post/:id
 * publish post
 * query param string
 */
const publishDraft = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndUpdate({ id }, { published: true })
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json(error)
  }
}

/**
 * POST /category
 * body
 * name: string
 */
const createCategory = async (req, res) => {
  const { name } = req.body

  try {
    const category = await Category.create({ name })

    return res.status(201).json(category)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  feed,
  createDraft,
  addPostToCategory,
  // filterPosts,
  getPostById,
  createCategory,
  publishDraft,
}
