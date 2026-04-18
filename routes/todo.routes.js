// routes/todo.routes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect.middleware');
const validate = require('../middleware/validate.middleware');
const { 
  createTodoSchema, 
  updateTodoSchema 
} = require('../validators/todo.validator');

const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller');

router.use(protect); // Apply protection middleware to all routes

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of all todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean' }
 *                 results: { type: 'number' }
 *                 data: { type: 'array', items: { $ref: '#/components/schemas/Todo' } }
 */

router.get('/', getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the todo
 *     responses:
 *       200:
 *         description: Todo found
 *       404:
 *         description: Todo not found
 */
router.get('/:id', getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created
 */
router.post('/', validate(createTodoSchema), createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated
 *       404:
 *         description: Todo not found
 */
router.put('/:id', validate(updateTodoSchema), updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the todo
 *     responses:
 *       200:
 *         description: Todo deleted
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', deleteTodo);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: 'string', example: 'Buy groceries' }
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.post('/', validate(createTodoSchema), createTodo);
/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     description: Creates a new todo item. Title is required and will be validated.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["title"]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Finish Node.js project"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: "boolean", example: true }
 *                 data: { $ref: "#/components/schemas/Todo" }
 *       400:
 *         description: Validation error (e.g. title is empty)
 */
router.post('/', validate(createTodoSchema), createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
router.delete('/:id', deleteTodo);

module.exports = router;