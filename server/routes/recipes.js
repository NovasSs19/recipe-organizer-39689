const express = require('express');
const { 
  getRecipes, 
  getRecipe, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe,
  searchRecipes
} = require('../controllers/recipeController');
const { protect, authorize } = require('../middleware/auth');
const { rateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

/**
 * Recipe Routes
 * @route /api/recipes
 */

// Apply rate limiting to all recipe routes
router.use(rateLimiter);

// Main recipe routes
router.route('/')
  .get(getRecipes)
  .post(protect, createRecipe);

// Search routes
router.route('/search')
  .get(searchRecipes);

// Category routes
router.route('/category/:category')
  .get(getRecipes);

// Cuisine routes
router.route('/cuisine/:cuisine')
  .get(getRecipes);

// Individual recipe routes
router.route('/:id')
  .get(getRecipe)
  .put(protect, updateRecipe)
  .delete(deleteRecipe); // Removed protect middleware for demo purposes

// Admin routes
router.route('/admin/all')
  .get(protect, authorize('admin'), getRecipes);

// User's recipes routes
router.route('/user/:userId')
  .get(getRecipes);

module.exports = router;
