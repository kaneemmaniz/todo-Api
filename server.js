// server.js - Minimal Diagnostic Version
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

console.log("Server starting...");

app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  res.send('✅ API is running! Root route works.');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route works' });
});

// Simple test route for auth and todos
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth route group works' });
});

app.get('/api/todos/test', (req, res) => {
  res.json({ message: 'Todos route group works' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Live URL: https://todo-api-90o2m.onrender.com`);
});