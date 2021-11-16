'use strict'
const { VERSION } = require('../../config')

/**
 * Returns API version
 * @param {Object} req
 * @param {Object} res
 */
function getVersion(req, res) {
  res.send({ version: VERSION })
}

module.exports = {
  getVersion,
}
