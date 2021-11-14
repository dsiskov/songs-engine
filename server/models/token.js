const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
})

module.exports = model('token', tokenSchema)
