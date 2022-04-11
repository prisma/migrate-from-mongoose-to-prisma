const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, {
  collection: 'Category'
})

module.exports = mongoose.model('Category', CategorySchema)