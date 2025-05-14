const mongoose = require('mongoose');

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
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert']
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
RecipeSchema.index({ title: 'text', ingredients: 'text' });

module.exports = mongoose.model('Recipe', RecipeSchema);
