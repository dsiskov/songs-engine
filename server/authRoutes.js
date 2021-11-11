const { authenticate, refreshToken, newUser } = require('./controllers/auth')

module.exports = (router, _expressApp) => {
  router.post('/signup', newUser)
  router.post('/signin', authenticate)
  router.post('/refreshToken', refreshToken)

  return router
}
