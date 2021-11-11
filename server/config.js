const dotenv = require('dotenv')
dotenv.config()

const { MONGO_URL, USE_TEST_DB, TEST_DB_URL, ...env } = process.env

if (USE_TEST_DB && !TEST_DB_URL) throw 'Please define TEST_DB_URL'

module.exports = {
  ...env,
  MONGO_URL: USE_TEST_DB ? TEST_DB_URL : MONGO_URL,
}
