const { MongoClient } = require('mongodb')
const { MONGO_URL } = require('../../config')

module.exports = async function createDb() {
  const client = await MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err)
  })

  if (!client) {
    return
  }

  try {
    return client
  } catch (err) {
    console.log(err)
  }
}
