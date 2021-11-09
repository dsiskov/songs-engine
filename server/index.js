const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

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

const apiRoutes = require('./apiRoutes')(express.Router(), app)
app.use('/api', apiRoutes)

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// start listening
const port = process.env.PORT || 5000
app.set('trust proxy', '127.0.0.1')
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
