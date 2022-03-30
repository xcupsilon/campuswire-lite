const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  author: { type: String, required: true },
  answer: String,
})

const Question = model('Question', questionSchema)

module.exports = Question
