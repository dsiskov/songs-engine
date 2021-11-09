'use strict'

function getVersion(req, res) {
  res.send({ version: process.env.VERSION })
}

module.exports = {
  getVersion,
}
