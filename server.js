// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config();

const app = express();
const connectDB = require('./config/db');

// ====================== MIDDLEWARE ======================
app.use(helmet());

// CORS - permissive for deployment
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));

// ====================== DATABASE ======================
connectDB();

// ====================== ROUTES ======================
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// ====================== SWAGGER ======================
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Root route
app.get('/', (req, res) => {
  res.send(`
    ✅ Todo API is running with MongoDB! 🚀<br><br>
    📚 <a href="/api-docs">View Interactive API Documentation</a>
  `);
});

// ====================== ERROR HANDLER ======================
// Must be last
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Live URL: https://todo-api-90o2m.onrender.com`);
  console.log(`📚 Swagger Docs: https://todo-api-90o2m.onrender.com/api-docs`);
});