const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  bio: String
})

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  profile: {
    type: ProfileSchema,
    default: {}
  }
}, {
  collection: 'User'
})


module.exports = mongoose.model('User', UserSchema)