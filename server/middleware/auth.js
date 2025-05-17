const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Get JWT secret from config
const JWT_SECRET = process.env.JWT_SECRET || config.jwt.secret || 'secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || config.jwt.expiresIn || '30d';

/**
 * Middleware to protect routes - verifies JWT token and sets user in request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.protect = async (req, res, next) => {
  let token;

  // Check if auth header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check if token is in cookies (for web clients)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in to access this resource',
      code: 'AUTH_REQUIRED'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again',
        code: 'TOKEN_EXPIRED'
      });
    }

    // Set user to req.user
    const user = await User.findById(decoded.id).select('+active');
    
    // Check if user still exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user associated with this token no longer exists',
        code: 'USER_NOT_FOUND'
      });
    }
    
    // Check if user is active
    if (user.active === false) {
      return res.status(401).json({
        success: false,
        message: 'This account has been deactivated',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }
    
    // Add user to request object
    req.user = user;
    
    // Log access for security auditing in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`User ${user.id} accessed ${req.originalUrl} at ${new Date().toISOString()}`);
    }
    
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    
    // Handle different JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again',
        code: 'INVALID_TOKEN'
      });
    }
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};

/**
 * Middleware to authorize based on user roles
 * @param {...String} roles - Roles that are authorized to access the route
 * @returns {Function} - Express middleware function
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists and has a role
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'User has no assigned role',
        code: 'NO_ROLE_ASSIGNED'
      });
    }
    
    // Check if user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${req.user.role} role is not authorized to access this resource`,
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    
    next();
  };
};

/**
 * Generate JWT token for a user
 * @param {Object} user - User object to generate token for
 * @returns {String} - JWT token
 */
exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

/**
 * Set token cookie in response
 * @param {Object} res - Express response object
 * @param {String} token - JWT token
 * @returns {Object} - Express response object with cookie set
 */
exports.sendTokenCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };
  
  return res.cookie('token', token, cookieOptions);
};
