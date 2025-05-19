/**
 * Application Configuration
 * Centralizes all configuration settings for the application
 */

// Environment variables with defaults
const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5050,
    env: process.env.NODE_ENV || 'development',
    apiUrl: process.env.API_URL || 'http://localhost:5000',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
  },
  
  // Database configuration
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-organizer',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    cookieExpires: process.env.JWT_COOKIE_EXPIRES_IN || 30
  },
  
  // File upload configuration
  upload: {
    maxSize: process.env.MAX_FILE_SIZE || 1024 * 1024 * 5, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    uploadDir: process.env.UPLOAD_DIR || 'uploads'
  },
  
  // Email configuration (for future use)
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@recipe-organizer.com'
  }
};

module.exports = config;
