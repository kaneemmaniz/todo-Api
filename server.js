// server.js - Debug Version
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

console.log("=== SERVER STARTING ON RENDER ===");

// Test basic route
app.get('/', (req, res) => {
  res.send('✅ API is running! Root route works on Render.');
});

// ====================== TRY TO LOAD ROUTES ======================
console.log("Attempting to load auth.routes.js...");

try {
  const authRoutes = require('./routes/auth.routes');
  app.use('/api/auth', authRoutes);
  console.log("✅ auth.routes.js loaded successfully");
} catch (err) {
  console.error("❌ Failed to load auth.routes.js:", err.message);
}

console.log("Attempting to load todo.routes.js...");

try {
  const todoRoutes = require('./routes/todo.routes');
  app.use('/api/todos', todoRoutes);
  console.log("✅ todo.routes.js loaded successfully");
} catch (err) {
  console.error("❌ Failed to load todo.routes.js:", err.message);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Live at https://todo-api-90o2m.onrender.com`);
});