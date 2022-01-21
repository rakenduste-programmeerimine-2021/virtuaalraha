const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) throw Error("The username or password is incorrect")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("The username or password is incorrect")

    const userTemplate = {
      id: user.id,
      firstName: user.firstName,
      role: user.role,
      email
    }

    console.debug(userTemplate);
    console.debug(process.env.JWT_SECRET);
    const token = jwt.sign(userTemplate, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    if (!token) throw Error("Something critical happened 99981811")

    res.status(200).json({
      token,
      ...userTemplate
    })

  } catch (e){
    res.status(400).json({ error: e.message })
  }
}

exports.signup = async (req, res) => {
  const { firstName, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) throw Error("User with that e-mail already exists")

    const salt = await bcrypt.genSalt(10)
    if (!salt) throw Error("Something critical happened 483543875")

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error("Something critical happened 123172387")

    const newUser = new User({
      firstName,
      email,
      password: hash
    })

    const savedUser = await newUser.save()
    if (!savedUser) throw Error("Error saving user")

    res.status(200).json({ message: "User created successfully" })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}