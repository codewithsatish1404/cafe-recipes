const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils');

// REGISTER

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if email exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: 'Email already exists'
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashed
  });

  res.json({ message: 'User registered successfully' });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: 'Invalid credentials'
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({
      message: 'Invalid credentials'
    });
  }

  const token = generateToken(user);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  res.json({ message: 'Login successful' });
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

// GET ME
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};