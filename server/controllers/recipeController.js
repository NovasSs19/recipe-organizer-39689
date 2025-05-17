const Recipe = require('../models/Recipe');
const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config/config');

// Helper function to check if string is valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @desc    Get all recipes with advanced filtering, sorting and pagination
 * @route   GET /api/recipes
 * @access  Public
 */
exports.getRecipes = async (req, res) => {
  try {
    let query;
    
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Finding resource
    query = Recipe.find(JSON.parse(queryStr));
    
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Recipe.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    // Executing query
    const recipes = await query;
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      pagination,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * @desc    Get single recipe with creator details
 * @route   GET /api/recipes/:id
 * @access  Public
 */
exports.getRecipe = async (req, res) => {
  try {
    // Validate ObjectId before querying database
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid recipe ID format: ${req.params.id}`
      });
    }

    // Find recipe and populate creator details
    const recipe = await Recipe.findById(req.params.id)
      .populate({
        path: 'createdBy',
        select: 'name email avatar'
      });
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${req.params.id}`
      });
    }
    
    // Track recipe views (could be implemented with a viewCount field)
    
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * @desc    Create new recipe with validation
 * @route   POST /api/recipes
 * @access  Private
 */
exports.createRecipe = async (req, res) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;
    
    // Validate required fields
    const { title, category, ingredients, instructions, prepTime, cookTime, servings } = req.body;
    
    if (!title || !category || !ingredients || !instructions || !prepTime || !cookTime || !servings) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
        requiredFields: ['title', 'category', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings']
      });
    }
    
    // Create recipe
    const recipe = await Recipe.create(req.body);
    
    // Update user's recipes count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { recipeCount: 1 }
    });
    
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * @desc    Update recipe with validation
 * @route   PUT /api/recipes/:id
 * @access  Private
 */
exports.updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is recipe owner
    if (recipe.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this recipe`
      });
    }
    
    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * @desc    Delete recipe with cleanup
 * @route   DELETE /api/recipes/:id
 * @access  Public (for demo purposes)
 */
exports.deleteRecipe = async (req, res) => {
  try {
    // Find recipe by ID and delete it directly
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    
    // If recipe doesn't exist
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${req.params.id}`
      });
    }
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting recipe',
      error: error.message
    });
  }
};

/**
 * @desc    Search recipes with advanced filtering
 * @route   GET /api/recipes/search
 * @access  Public
 */
exports.searchRecipes = async (req, res) => {
  try {
    const { query, category, cuisine, maxTime, difficulty } = req.query;
    
    if (!query && !category && !cuisine && !maxTime && !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one search parameter'
      });
    }
    
    // Build search criteria
    const searchCriteria = {};
    
    // Text search if query is provided
    if (query) {
      searchCriteria.$text = { $search: query };
    }
    
    // Filter by category if provided
    if (category) {
      searchCriteria.category = category;
    }
    
    // Filter by cuisine if provided
    if (cuisine) {
      searchCriteria.cuisine = cuisine;
    }
    
    // Filter by total cooking time if provided
    if (maxTime) {
      const maxTimeInt = parseInt(maxTime);
      if (!isNaN(maxTimeInt)) {
        searchCriteria.$expr = { $lte: [{ $add: ['$prepTime', '$cookTime'] }, maxTimeInt] };
      }
    }
    
    // Filter by difficulty if provided
    if (difficulty) {
      searchCriteria.difficulty = difficulty;
    }
    
    // Execute search with pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const recipes = await Recipe.find(searchCriteria)
      .select('title category cuisine prepTime cookTime difficulty imageUrl createdAt')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Recipe.countDocuments(searchCriteria);
    
    // Build pagination object
    const pagination = {};
    if (startIndex + limit < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      total,
      pagination,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
