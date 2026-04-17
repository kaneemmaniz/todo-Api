// controllers/todo.controller.js
const Todo = require('../models/todo.model');
const AppError = require('../utils/AppError');
const { formatResponse } = require('../utils/responseFormatter');

// Get all todos
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      results: todos.length,
      data: formatResponse(todos)
    });
  } catch (error) {
    next(error);
  }
};

// Get single todo
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

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

// Create new todo
const createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      completed: false
    });

    res.status(201).json({
      success: true,
      data: formatResponse(newTodo)
    });
  } catch (error) {
    next(error);
  }
};

// Update todo
const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
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

// Delete todo
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

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