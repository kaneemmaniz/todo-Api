// controllers/auth.controller.js
const User = require('../models/user.model');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Register user
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('Name, email and password are required', 400));
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('User already exists with this email', 400));
    }

    // Create user
    const newUser = await User.create({ 
      name, 
      email, 
      password 
    });

    // Generate token
    const token = signToken(newUser._id);

    // Send clean response
    res.status(201).json({
      success: true,
      token,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Register error:", error.message);   // Log for debugging
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(user._id);

    res.json({
      success: true,
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    next(error);
  }
};

module.exports = { register, login };