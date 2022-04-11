require('dotenv').config()
const mongoose = require('mongoose')

const Post = require('./models/post')
const User = require('./models/user')
const Category = require('./models/category')
const connect = require('./util/db')


const ObjectId = mongoose.Types.ObjectId

const category_id1 = new ObjectId
const category_id2 = new ObjectId
const category_id3 = new ObjectId
const category_id4 = new ObjectId

const author_id1 = new ObjectId
const author_id2 = new ObjectId
const author_id3 = new ObjectId

const categories = [
  {
    _id: category_id1,
    name: 'MongoDB'
  },
  {
    _id: category_id2,
    name: 'ORMs'
  },
  {
    _id: category_id3,
    name: 'Databases'
  },
  {
    _id: category_id4,
    name: 'Prisma'
  }
]

const posts = [
  {
    title: 'Join the Prisma Slack',
    content: 'https://slack.prisma.io',
    published: true,
    author: author_id1,
    categories: [
      { _id: category_id1 },
      { _id: category_id4 },
    ]
  },
  {
    title: 'Follow Prisma on Twitter',
    content: 'https://www.twitter.com/prisma',
    published: false,
    author: author_id2,
    categories: [
      { _id: category_id2 },
      { _id: category_id3 },
    ]
  },
  {
    title: 'Ask a question about Prisma on GitHub',
    content: 'https://www.github.com/prisma/prisma/discussions',
    published: false,
    author: author_id3,
    categories: [
      { _id: category_id1 },
    ]
  },
  {
    title: 'Prisma on YouTube',
    content: 'https://pris.ly/youtube',
    published: true,
    author: author_id3,
    categories: [
      { _id: category_id1 },
    ]
  }
]

const authors = [
  {
    _id: author_id1,
    name: 'Nikolas Burk',
    email: 'nikolas@prisma.io',
    profile: {
      bio: 'Learner, Builder, Teacher'
    }
  },
  {
    _id: author_id2,
    name: 'Petra Donka',
    email: 'petra@prisma.io',
  },
  {
    _id: author_id3,
    name: 'Nilu',
    email: 'nilu@prisma.io',
    profile: {
      bio: 'Software Engineer'
    }
  }
]

const seed = async () => {
  connect()
  /** clear db */
  await Post.deleteMany({})
  await Category.deleteMany({})
  await User.deleteMany({})

  /**
   * seed db
   */
  await Category.insertMany(categories)
  await Post.insertMany(posts)
  await User.insertMany(authors)
}

seed()
  .then(() => mongoose.connection.close())