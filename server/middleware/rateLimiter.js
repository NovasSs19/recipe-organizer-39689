/**
 * Rate Limiter Middleware
 * Limits the number of requests a client can make in a specific time window
 */
const rateLimit = require('express-rate-limit');

// Create a rate limiter
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  }
});

module.exports = { rateLimiter };
