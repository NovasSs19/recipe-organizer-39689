const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getMe, 
  updateProfile, 
  changePassword, 
  logout 
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { rateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

/**
 * User Routes
 * @route /api/users
 */

// Apply rate limiting to all user routes
router.use(rateLimiter);

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);

module.exports = router;
