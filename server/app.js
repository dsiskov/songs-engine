const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
const routes = require('./api')
const { NODE_ENV, MONGO_URL } = require('./config')

const app = express()

if (NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.on('error', (err) => {
    console.error(`mongo error: ${err.message}`)
  })
}
mongoose.Promise = global.Promise

app.use(cookieParser())
app.use(express.json())
app.use(logger('dev'))
app.use(
  express.urlencoded({
    extended: false,
  })
)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.static(path.join(__dirname, '../client/public')))

// nb: cors settings must be included before other routes
app.use(cors())
app.use(routes())

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = app
