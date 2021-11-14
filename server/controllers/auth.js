'use strict'
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../models/Token')
const { randomBytes } = require('crypto')

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
} = require('../config')

module.exports = {
  authenticate,
  refreshToken,
  newUser,
}

async function newUser(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.status(403).json({
      message: 'Username is already taken',
    })
  }
  const newUser = await User.create({ email, password })
  res.status(201).send({ user: newUser._id })
}

async function authenticate(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(403).json({
      message: 'Username or password is missing',
    })
  }
  const user = User.findOne({ id: username })
  if (!user) {
    return throwFailed(res, 'Authentication failed. User not found.')
  }
  const valid = compareSync(password, user.password)
  if (!valid)
    return res.status(401).send({
      accessToken: null,
      message: 'Invalid Password!',
    })

  const refreshToken = await Token.create(_generateToken(user.id))

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

  const tokenInDb = Token.findOne({ where: { token } })
  if (tokenInDb.expiryDate.getTime() < new Date().getTime()) {
    Token.destroy({ where: { token } })

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

  function _generateToken(userId) {
    const expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + REFRESH_TOKEN_EXPIRE)

    return {
      token: randomBytes(32).toString('hex'),
      userId,
      expiryDate: expiredAt,
    }
  }
}
