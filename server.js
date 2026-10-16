const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('./server/config/db');
const apiRoutes = require('./server/routes/apiRoutes');
const errorHandler = require('./server/middleware/errorHandler');

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors());

// Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Connect to MongoDB
connectDB();

// Serve Static Frontend
app.use(express.static(path.join(__dirname, 'client')));

// API Routes
app.use('/api', apiRoutes);

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
