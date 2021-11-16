const { getVersion } = require('./api/version')
const { authenticate, refreshToken, newUser } = require('./auth/authorize')

/**
 * /api
 * @param {*} router
 * @param {*} _expressApp
 * @returns
 */
function api(router, _expressApp) {
  router.get('/version', getVersion)

  return router
}

/**
 * /auth
 * @param {*} router
 * @param {*} _expressApp
 * @returns
 */
function auth(router, _expressApp) {
  router.post('/signup', newUser)
  router.post('/signin', authenticate)
  router.post('/refreshToken', refreshToken)

  return router
}

module.exports = { api, auth }
