const mongoose = require('mongoose');

/**
 * Recipe Schema
 * Defines the structure for recipe documents in MongoDB
 */
const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer', 'soup', 'salad', 'main', 'side', 'drink']
  },
  cuisine: {
    type: String,
    required: [true, 'Please specify the cuisine'],
    enum: ['italian', 'mexican', 'chinese', 'indian', 'french', 'japanese', 'mediterranean', 'american', 'thai', 'turkish', 'other']
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add ingredients']
  },
  instructions: {
    type: String,
    required: [true, 'Please add cooking instructions']
  },
  prepTime: {
    type: Number,
    required: [true, 'Please add preparation time in minutes']
  },
  cookTime: {
    type: Number,
    required: [true, 'Please add cooking time in minutes']
  },
  servings: {
    type: Number,
    required: [true, 'Please add number of servings']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  imageUrl: {
    type: String,
    default: 'default-recipe.jpg'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for search functionality
RecipeSchema.index({ title: 'text', ingredients: 'text', cuisine: 'text', category: 'text' });

/**
 * Virtual for total time
 * Calculates total cooking time by adding prep and cook time
 */
RecipeSchema.virtual('totalTime').get(function() {
  return this.prepTime + this.cookTime;
});

/**
 * Pre-save middleware
 * Runs before saving the document
 */
RecipeSchema.pre('save', function(next) {
  // Capitalize first letter of title
  if (this.title) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }
  next();
});

module.exports = mongoose.model('Recipe', RecipeSchema);
