const UserDb = require('./table/user')
const TokenDb = require('./table/token')
const createMongoClient = require('./mongo-client')

module.exports = async function createDb() {
  const client = await createMongoClient()
  const db = client.db()
  const userDb = new UserDb(db)
  const tokenDb = new TokenDb(db)

  return { userDb, tokenDb, client }
}
