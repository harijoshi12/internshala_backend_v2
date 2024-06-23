// src/controllers/userController.js

const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../validations/auth.validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  // Check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ success: false, message: 'Email already exists' });

  // Create new user
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
  });

  try {
    const savedUser = await user.save();
    savedUser.password = undefined;
    res.status(201).json({ success: true, data: savedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  // Check if user exists
  const user = await User.findOne({ email: req.body.email }).select('+password').lean();
  if (!user) return res.status(400).json({ success: false, message: 'Email or password is incorrect' });

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ success: false, message: 'Invalid password' });

  // Create and assign a token
  delete user.password;
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  res.header('auth-token', token).json({ success: true, token: token, user: user});
};

module.exports = {
  registerUser,
  loginUser,
};
