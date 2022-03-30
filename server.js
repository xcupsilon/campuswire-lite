const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')

// Routers
const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

// Start the app and get mongoDB url
const app = express()
const MONGO_URL = process.env.MONGODB_URL || 'mongodb+srv://xcyan:U6mBOiNH1jCQXnNe@cluster0.ffmax.mongodb.net/cw-lite?retryWrites=true&w=majority'

app.use(express.json()) // Parse body using middleware

// If connection fails, will show up here
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cookieSession({
  name: 'session',
  keys: ['mango'],
  maxAge: 24 * 60 * 60 * 1000, // expiration time: 24 hours
}))

app.get('/', (req, res) => {
  res.send('Hello from Root uwu')
})

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.send('An booming error has occurred', { error: err })
  return null
})

app.listen(3000, () => {
})
