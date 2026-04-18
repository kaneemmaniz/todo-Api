// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

console.log("🚀 Server starting on Render...");

// ====================== ROUTES ======================
console.log("Loading auth routes...");
const authRoutes = require('./routes/auth.routes');

console.log("Loading todo routes...");
const todoRoutes = require('./routes/todo.routes');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

console.log("✅ All routes loaded successfully");

// Root route
app.get('/', (req, res) => {
  res.send('✅ API is running! Root route works on Render.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Live at https://todo-api-90o2m.onrender.com`);
});