const { getVersion } = require('./routes/version')

module.exports = (router, _expressApp) => {
  router.get('/version', getVersion)

  return router
}
