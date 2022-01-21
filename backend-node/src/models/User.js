const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now }
});

const User = model("User", userSchema)

module.exports = User