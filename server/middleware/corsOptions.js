/**
 * CORS Configuration
 * Configures Cross-Origin Resource Sharing options for the API
 */

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000', // Development frontend
  'http://localhost:5000', // Development backend
  'https://recipe-organizer-39689.netlify.app', // Production frontend
];

// CORS options configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      // Origin is allowed
      callback(null, true);
    } else {
      // Origin is not allowed
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

module.exports = corsOptions;
