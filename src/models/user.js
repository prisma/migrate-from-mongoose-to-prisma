const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  bio: String
}, {
  _id: false,
})

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  // an empty embedded document is created here anyway
  profile: {
    type: ProfileSchema,
    default: () => ({})
  }
})


module.exports = mongoose.model('User', UserSchema)