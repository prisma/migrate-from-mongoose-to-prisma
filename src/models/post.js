const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: String,
  content: String,
  published: {
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author',
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ]
}, {
  // name the Collection => default collection is pluralized and in lowercase
  collection: 'Post'
})

module.exports = mongoose.model('Post', PostSchema)