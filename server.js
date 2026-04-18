// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

console.log("Server starting on Render...");

// ====================== ROUTES ======================
console.log("Loading auth routes...");
const authRoutes = require('./routes/auth.routes');

console.log("Loading todo routes...");
const todoRoutes = require('./routes/todo.routes');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('✅ API is running! Root route works on Render.');
});

// Test routes
app.get('/test', (req, res) => {
  res.json({ message: 'Test route works' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Live at https://todo-api-90o2m.onrender.com`);
});