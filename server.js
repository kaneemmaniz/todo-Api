// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const connectDB = require('./config/db');

// ====================== MIDDLEWARE ======================
app.use(helmet());

// Replace the current cors line with this:
app.use(cors({
  origin: [
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'https://todo-api-9o2m.onrender.com',   // Add your Render URL
    'https://*.onrender.com'                 // Allow all Render subdomains
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

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

// Replace the last part (from const PORT = ... to the end)
const PORT = process.env.PORT || 5000;   // This line is already good, but make sure it's there

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);
  console.log(`🌐 Live URL: https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'todo-api-9o2m.onrender.com'}`);
});