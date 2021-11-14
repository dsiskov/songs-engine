const app = require('./app')
const { PORT } = require('./config')

const port = PORT || 5000
app.set('trust proxy', '127.0.0.1')
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
