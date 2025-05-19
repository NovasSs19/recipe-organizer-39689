const mongoose = require('mongoose');
const config = require('./config');
const environments = require('./environments');

/**
 * Database Connection
 * Establishes connection to MongoDB using configuration settings
 */
const connectDB = async () => {
  try {
    // Get database URI and options from config
    const { uri, options } = config.db;
    
    // Use standard MongoDB connection options
    const dbOptions = {
      ...options
    };
    
    // Connect to MongoDB
    const conn = await mongoose.connect(uri, dbOptions);

    // Log connection success
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Log additional info in development mode
    if (environments.debug) {
      console.log(`Database Name: ${conn.connection.name}`);
      console.log(`Connection State: ${mongoose.STATES[conn.connection.readyState]}`);
    }
  } catch (error) {
    // Log connection error and exit
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
