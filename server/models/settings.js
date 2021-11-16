const { Schema, model } = require('mongoose')

const settingsSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    required: true,
  },
  nightMode: {
    type: Boolean,
    required: true,
    unique: true,
  },
})

const Settings = model('settings', settingsSchema)

module.exports = Settings
