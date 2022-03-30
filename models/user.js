const { Schema, model } = require('mongoose')

// Creating the user schema, defines what our database would look like
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})
// Defining a name for the schema
const User = model('User', userSchema)

module.exports = User
