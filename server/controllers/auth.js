'use strict'
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE } = require('../config')

module.exports = {
  authenticate,
  refreshToken,
  newUser,
}

let userDb, tokenDb
require('../scripts/db/tables')().then((dbs) => {
  ;({ userDb, tokenDb } = dbs)
})

async function newUser(req, res) {
  const { username, password } = req.body
  const user = userDb.table().findOne({ id: username })
  if (user) {
    return res.status(403).json({
      message: 'Username is already taken',
    })
  }
  await userDb.table().insert({ id: username, password })
  res.status(200).send()
}

async function authenticate(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(403).json({
      message: 'Username or password is missing',
    })
  }
  const user = userDb.table().findOne({ id: username })
  if (!user) {
    return throwFailed(res, 'Authentication failed. User not found.')
  }
  const valid = compareSync(password, user.password)
  if (!valid)
    return res.status(401).send({
      accessToken: null,
      message: 'Invalid Password!',
    })

  const refreshToken = await tokenDb.createToken(user.id)

  res.status(200).send({
    accessToken: jwt.sign(user.id, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE,
    }),
    refreshToken,
  })
}

function refreshToken(req, res) {
  const { refreshToken: token } = req.body
  if (!token) {
    return res.status(403).json({ message: 'Refresh Token is required!' })
  }

  const tokenInDb = tokenDb.table.findOne({ where: { token } })
  if (tokenDb.verifyExpiration(tokenInDb)) {
    tokenDb.table.destroy({ where: { token } })

    res.status(403).json({
      message: 'Refresh token was expired. Please make a new signin request',
    })
    return
  }

  const accessToken = jwt.sign(tokenInDb.userId, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  })

  return res.status(200).json({
    accessToken,
    refreshToken: tokenInDb.token,
  })
}
