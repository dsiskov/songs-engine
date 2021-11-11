const Table = require('./table')
const { randomBytes } = require('crypto')
const { REFRESH_TOKEN_EXPIRE } = require('../../../config')

class TokenDb extends Table {
  constructor(db) {
    super(db, 'tokens')
  }

  async createToken(userId) {
    const expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + REFRESH_TOKEN_EXPIRE)

    const refreshToken = {
      token: randomBytes(32).toString('hex'),
      userId,
      expiryDate: expiredAt.getTime(),
    }
    await this.table.insert(refreshToken)

    return refreshToken.token
  }

  verifyExpiration(token) {
    return token.expiryDate.getTime() < new Date().getTime()
  }
}

module.exports = TokenDb
