const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { NODE_ENV } = require('./config')

const app = express()

if (NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

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
app.use((req, _res, next) => {
  const { url } = req
  if (url.startsWith('/auth')) {
    next()
    return
  }
  const authHeader = req.headers['x-access-token']
  if (authHeader == null) {
    return next({ status: 401, message: 'authorization missing' })
  }
  jwt.verify(authHeader, Constant.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next({ status: 403, message: err.message })
    req.user = user
    next()
  })
})
// nb: cors settings must be included before other routes
app.use(cors())

const apiRoutes = require('./apiRoutes')(express.Router(), app)
const authRoutes = require('./authRoutes')(express.Router(), app)
app.use('/api', apiRoutes)
app.use('/auth', authRoutes)

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = app
