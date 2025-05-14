/**
 * Security Configuration
 * Centralizes all security-related settings for the application
 */

const security = {
  // CORS allowed origins
  cors: {
    allowedOrigins: [
      'http://localhost:3000', // Development frontend
      'http://localhost:5000', // Development backend
      'https://recipe-organizer-39689.netlify.app', // Production frontend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again after 15 minutes'
    }
  },
  
  // Helmet configuration (HTTP headers security)
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
        connectSrc: ["'self'"]
      }
    },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: 'same-origin' }
  },
  
  // Password policy
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true
  }
};

module.exports = security;
