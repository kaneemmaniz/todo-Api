
// server.js
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
  ? ['https://todo-api-90o2m.onrender.com']
  : ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use(morgan('dev'));

// Swagger UI (move before routes for reliability)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("=== SERVER STARTING ON RENDER ===");

// Load routes with error catching
console.log("Loading auth routes...");
try {
  const authRoutes = require('./routes/auth.routes');
  app.use('/api/auth', authRoutes);
  console.log("✅ auth.routes.js loaded successfully");
} catch (err) {
  console.error("❌ Failed to load auth.routes.js:", err.message);
}

console.log("Loading todo routes...");
try {
  const todoRoutes = require('./routes/todo.routes');
  app.use('/api/todos', todoRoutes);
  console.log("✅ todo.routes.js loaded successfully");
} catch (err) {
  console.error("❌ Failed to load todo.routes.js:", err.message);
}



// Root route
app.get('/', (req, res) => {
  res.send('✅ API is running! Root route works on Render.');
});


// Error handler middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Live at https://todo-api-90o2m.onrender.com`);
});