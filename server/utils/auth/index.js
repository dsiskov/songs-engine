const { randomBytes } = require('crypto')

module.exports = {
  generateToken,
}

function generateToken(userId, expireTime) {
  const expiredAt = new Date()
  expiredAt.setSeconds(expiredAt.getSeconds() + expireTime)

  return {
    token: randomBytes(32).toString('hex'),
    userId,
    expiryDate: expiredAt,
  }
}
