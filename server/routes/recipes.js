const express = require('express');
const { 
  getRecipes, 
  getRecipe, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe,
  searchRecipes
} = require('../controllers/recipeController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Recipe routes
router.route('/')
  .get(getRecipes)
  .post(protect, createRecipe);

router.route('/search')
  .get(searchRecipes);

router.route('/:id')
  .get(getRecipe)
  .put(protect, updateRecipe)
  .delete(deleteRecipe); // Removed protect middleware for demo purposes

module.exports = router;
