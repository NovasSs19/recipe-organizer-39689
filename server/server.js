require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import configuration
const config = require('./config/config');
const security = require('./config/security');
const environments = require('./config/environments');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes (to be created later)
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');

// Initialize express app
const app = express();
const PORT = config.server.port;

// Security and optimization middleware
app.use(helmet(security.helmet)); // Set security HTTP headers
app.use(cors(security.cors)); // Enable CORS with custom options
app.use(compression()); // Compress response bodies

// Rate limiting middleware
const apiLimiter = rateLimit(security.rateLimit);
app.use('/api/', apiLimiter); // Apply rate limiting to API routes

// Request parsing middleware
app.use(express.json({ limit: config.upload.maxSize })); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: config.upload.maxSize })); // Parse URL-encoded request bodies

// Logging middleware
app.use(morgan(environments.morgan));

// Set security-related response headers
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Recipe Organizer API');
  res.setHeader('X-App-Version', '1.0.0');
  next();
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Recipe Organizer API is running');
});

// Connect to MongoDB
connectDB();

// Error handling middleware (must be after route definitions)
app.use(errorHandler);

// Handle 404 errors for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.server.env} mode on port ${PORT}`);
  console.log(`API URL: ${config.server.apiUrl}`);
  console.log(`Client URL: ${config.server.clientUrl}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
