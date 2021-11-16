'use strict'
const { Router } = require('express')
const auth = require('../middlewares/auth')
const { VERSION } = require('../../config')
const Settings = require('../../models/settings')

const route = Router()

module.exports = (app) => {
  app.use('/api', route)

  /**
   * Version of API
   */
  route.get('/version', (_req, res) => {
    return res.json({ version: VERSION }).status(200)
  })

  /**
   * User settings
   */
  route.get('/settings', auth, (req, res) => {
    const { user } = req
    const settings = Settings.findOne({ user })
    if (!settings) {
      return throwFailed(res, 'Settings not found.')
    }
  })
}
