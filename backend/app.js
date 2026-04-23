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

// 🔹 Connect DB
connectDB();

// 🔹 CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser()); // ✅ important

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 🔹 Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// 🔹 Routes
app.use('/api', recipeRoutes);
app.use('/api/methods', methodsRoutes);
app.use('/api/auth', authRoutes); // ✅ auth added

// 🔹 Error handler
app.use(errorHandler);

// 🔹 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;