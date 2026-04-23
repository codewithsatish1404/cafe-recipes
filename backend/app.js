const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const recipeRoutes = require('./routes/recipes');
const methodsRoutes = require('./routes/method');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 🔹 Connect DB (kept same logic)
connectDB();

// 🔹 CORS (safe for production + local)
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 🔹 Health check (important for Render monitoring)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 🔹 Routes
app.use('/api', recipeRoutes);
app.use('/api/methods', methodsRoutes);
app.use('/api/auth', authRoutes);

// 🔹 Error handler
app.use(errorHandler);

// 🔹 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;