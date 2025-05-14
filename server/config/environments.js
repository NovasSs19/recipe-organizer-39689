/**
 * Environment-specific Configuration
 * Provides different settings based on the current environment (development, test, production)
 */

// Base configuration for all environments
const baseConfig = {
  logging: true
};

// Environment-specific configurations
const environments = {
  // Development environment (local)
  development: {
    ...baseConfig,
    logging: true,
    debug: true,
    morgan: 'dev',
    db: {
      uri: 'mongodb://localhost:27017/recipe-organizer',
      logging: true
    }
  },
  
  // Test environment
  test: {
    ...baseConfig,
    logging: false,
    debug: false,
    morgan: 'combined',
    db: {
      uri: 'mongodb://localhost:27017/recipe-organizer-test',
      logging: false
    }
  },
  
  // Production environment
  production: {
    ...baseConfig,
    logging: false,
    debug: false,
    morgan: 'combined',
    db: {
      uri: process.env.MONGODB_URI,
      logging: false
    }
  }
};

// Get current environment or default to development
const currentEnv = process.env.NODE_ENV || 'development';

// Export the configuration for the current environment
module.exports = {
  ...environments[currentEnv],
  currentEnv
};
