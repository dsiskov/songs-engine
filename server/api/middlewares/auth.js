module.exports = authentication

/**
 * Check authentication rights
 * @param {Object} req Express req
 * @param {Object} res  Express res
 * @param {Function} next  Express next
 */
function authentication(req, _res, next) {
  const authHeader = req.headers['x-access-token']
  if (authHeader == null) {
    return next({ status: 401, message: 'authorization missing' })
  }
  jwt.verify(authHeader, Constant.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next({ status: 403, message: err.message })
    req.user = user
    next()
  })
}
