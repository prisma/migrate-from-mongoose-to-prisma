const prisma = require('../prisma')

/**
 * PUT /addPostToCategory
 * query string
 * postId string
 * categoryId string
 */
const addPostToCategory = async (req, res) => {
  const { id, categoryId } = req.params

  try {
    const post = await prisma.post.update({
      where: {
        id
      },
      data: {
        categories: {
          connect: [
            {
              id: categoryId
            }
          ]
        }
      }
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
 */
const feed = async (req, res) => {
  try {
    const { searchString, skip, take } = req.query

    const or = searchString ? {
      OR: [
        { title: { contains: searchString } },
        { content: { contains: searchString } },
      ],
    } : {}

    const feed = await prisma.post.findMany({
      where: {
        published: true,
        ...or,
      },
      include: { author: true, categories: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
    })

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
    const draft = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: authorEmail
          }
        },
      }
    })

    res.status(201).json(draft)
  } catch (error) {
    return res.status(500).json(error)
  }
}


/**
 * GET /post/:id
 * query string
 * id
 */
const getPostById = async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) return res.status(404).json({ message: "Post not found" })

    return res.status(200).json(post)
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
    const post = await prisma.post.update({
      where: { id },
      data: { published: true }
    })
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
    const category = await prisma.category.create({
      data: { name }
    })

    return res.status(201).json(category)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  feed,
  createDraft,
  addPostToCategory,
  getPostById,
  createCategory,
  publishDraft,
}
