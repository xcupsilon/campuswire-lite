const express = require('express')

const router = express.Router()
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/questions', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions) // Send back the questions and preserve the variable nature
  } catch (error) {
    res.send('Error occurred when fetching question')
    next(error)
  }
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  try {
    const { body, session } = req
    const { username } = session // Getting the author from the cookie :)
    const { questionText } = body
    await Question.create({ questionText, author: username })
    res.send(`Question created for "${questionText}" by ${username}, waiting for responses hehe!`)
  } catch (error) {
    res.send('Error occured when adding question, nyooo!')
    next(error)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  try {
    const { body } = req
    const { _id, answer } = body
    const { questionText, username } = await Question.findOne({ _id })

    await Question.updateOne({ _id }, {
      questionText, username, answer, _id,
    })
    res.send(`Succesfully uploaded answer "${answer}" for "${questionText}", you are the best!`)
  } catch (error) {
    res.send('Error occured when updating answer, HMMMMM!')
    next(error)
  }
})

module.exports = router
