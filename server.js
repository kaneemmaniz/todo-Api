const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Connect to MongoDB
connectDB();

// CORS: Allow only specific origins in production
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://todo-api-9o2m.onrender.com']
  : ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use(morgan('dev'));

// Swagger UI (must be before routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get('/', (req, res) => {
  res.send('✅ API is running! Root route works on Render.');
});

// Load routes
try {
  const authRoutes = require('./routes/auth.routes');
  app.use('/api/auth', authRoutes);
  console.log("✅ auth.routes.js loaded successfully");
} catch (err) {
  console.error("❌ Failed to load auth.routes.js:", err.message);
}

try {
  const todoRoutes = require('./routes/todo.routes');
  app.use('/api/todos', todoRoutes);
  console.log("✅ todo.routes.js loaded successfully");
} catch (err) {
  console.error("❌ Failed to load todo.routes.js:", err.message);
}

// Error handler middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Live at https://todo-api-9o2m.onrender.com`);
});