'use strict'
const { VERSION } = require('../config')

function getVersion(req, res) {
  res.send({ version: VERSION })
}

module.exports = {
  getVersion,
}
