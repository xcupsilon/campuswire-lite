const express = require('express')

const router = express.Router()
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.post('/signup', async (req, res, next) => {
  try {
    const { body } = req
    const { username, password } = body
    const result = await User.findOne({ username, password })
    // if user already exists, then let go registration
    if (result) {
      res.send(`User "${username}" already exists`)
    } else {
      await User.create({ username, password })
      res.send(`Signup for ${username} was succesful, hooray!!`)
    }
  } catch (error) {
    res.send('Signup failed, cries ;-;')
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { body } = req
    const { username, password } = body
    const result = await User.findOne({ username, password }) // get the user with matching username and password
    if (result) {
      req.session.username = username
      res.send(`User: ${username} succesfully logged in`)
    } else {
      res.send(`Cannot find user: ${username}`)
    }
  } catch (error) {
    res.send('User login failed')
    next(error)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session = null // destroy the session
  res.send('User logged out')
})

module.exports = router
