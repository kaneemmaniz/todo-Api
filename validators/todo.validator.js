// validators/todo.validator.js
const { z } = require('zod');

// Schema for creating a new todo
const createTodoSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title cannot be more than 200 characters")
    .trim(),
});

// Schema for updating a todo (title is optional, completed is boolean)
const updateTodoSchema = z.object({
  title: z.string()
    .min(1, "Title cannot be empty")
    .max(200, "Title too long")
    .trim()
    .optional(),
  completed: z.boolean().optional()
}).refine(data => {
  // At least one field must be provided for update
  return data.title !== undefined || data.completed !== undefined;
}, {
  message: "At least one field (title or completed) must be provided"
});

// Schema for ID parameter (used in GET/PUT/DELETE /:id)
const mongoIdSchema = z.object({
  id: z.string()
    .length(24, "Invalid ID format")
    .regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid MongoDB ObjectId")
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  mongoIdSchema   // ← Add this
};