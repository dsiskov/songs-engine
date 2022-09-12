const { Schema, model } = require('mongoose')

const settingsSchema = new Schema({
  name: String,
  email: String,
  nightMode: Boolean,
})

const Settings = model('settings', settingsSchema)

module.exports = Settings
