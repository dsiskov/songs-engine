const { Router } = require('express')
const api = require('./routes/api')
const auth = require('./routes/auth')

module.exports = () => {
  const app = Router()
  auth(app)
  api(app)

  return app
}
