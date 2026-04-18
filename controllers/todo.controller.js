// controllers/todo.controller.js
const Todo = require('../models/todo.model');
const AppError = require('../utils/AppError');
const { formatResponse } = require('../utils/responseFormatter');

// Get all todos (user-specific)
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      results: todos.length,
      data: formatResponse(todos)
    });
  } catch (error) {
    next(error);
  }
};

// Get single todo (user-specific)
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return next(new AppError("Todo not found", 404));
    }
    res.json({
      success: true,
      data: formatResponse(todo)
    });
  } catch (error) {
    next(error);
  }
};

// Create new todo (user-specific)
const createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      completed: false,
      user: req.user._id
    });
    res.status(201).json({
      success: true,
      data: formatResponse(newTodo)
    });
  } catch (error) {
    next(error);
  }
};

// Update todo (user-specific)
const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title: req.body.title,
        completed: req.body.completed
      },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return next(new AppError("Todo not found", 404));
    }
    res.json({
      success: true,
      data: formatResponse(todo)
    });
  } catch (error) {
    next(error);
  }
};

// Delete todo (user-specific)
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return next(new AppError("Todo not found", 404));
    }
    res.json({
      success: true,
      message: "Todo deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};