// server.js - Minimal Test Version
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

console.log("Server starting...");

// Test routes
app.get('/', (req, res) => {
  res.send('✅ API is running! Root route works on Render.');
});

app.post('/api/auth/login', (req, res) => {
  res.json({ success: true, message: "Login route is working" });
});

app.post('/api/todos', (req, res) => {
  res.json({ success: true, message: "Todo route is working" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Live at https://todo-api-90o2m.onrender.com`);
});