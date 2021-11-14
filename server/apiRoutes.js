const { getVersion } = require('./controllers/version')
//const { getUser, updateUser } = require('./controllers/user')

module.exports = (router, _expressApp) => {
  router.get('/version', getVersion)

  // router.get('/user', getUser)
  // router.post('/user', updateUser)

  return router
}
