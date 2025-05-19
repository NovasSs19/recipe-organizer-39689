import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all recipes
  const getRecipes = async (filters = {}) => {
    setLoading(true);
    setError(null); // Clear previous errors
    
    try {
      console.log('Fetching recipes with filters:', filters);
      
      let queryString = '';
      
      // Build query string from filters
      if (Object.keys(filters).length > 0) {
        queryString = '?' + new URLSearchParams(filters).toString();
      }
      
      // Add token to headers
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      };
      
      console.log('Making API request to:', `/api/recipes${queryString}`);
      const res = await axios.get(`/api/recipes${queryString}`, config);
      
      console.log('Recipe API response:', res.data);
      
      if (res.data && res.data.data) {
        setRecipes(res.data.data);
        return res.data;
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      const errorMessage = error.response?.data?.message || 'Error fetching recipes';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get single recipe
  const getRecipe = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/recipes/${id}`);
      setRecipe(res.data.data);
      return res.data.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching recipe');
      toast.error('Error fetching recipe details');
    } finally {
      setLoading(false);
    }
  };

  // Create new recipe
  const createRecipe = async (recipeData) => {
    console.log('Creating recipe with data:', recipeData); // Debug info
    
    // Set loading state and clear previous errors
    setLoading(true);
    setError(null);
    
    try {
      // Data validation - ensure all required fields are filled
      const requiredFields = ['title', 'category', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings'];
      const missingFields = requiredFields.filter(field => {
        if (field === 'ingredients') {
          return !recipeData.ingredients || recipeData.ingredients.length === 0 || 
                 (recipeData.ingredients.length === 1 && recipeData.ingredients[0].trim() === '');
        }
        return !recipeData[field] || recipeData[field].toString().trim() === '';
      });
      
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        const errorMsg = `Missing fields: ${missingFields.join(', ')}`;
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return null;
      }
      
      // Send API request - axiosConfig.js will automatically add the token
      console.log('Sending API request to create recipe...');
      const res = await axios.post('/api/recipes', recipeData);
      console.log('API response:', res.data);
      
      // Update recipes state if successful
      if (res.data && res.data.data) {
        console.log('Recipe created successfully:', res.data.data);
        setRecipes(prevRecipes => [...prevRecipes, res.data.data]);
        toast.success('Recipe created successfully!');
        return res.data.data;
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Create recipe error:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      // Set error message
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'Error creating recipe';
      
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      console.log('Setting loading state to false');
      setLoading(false);
    }
  };

  // Update recipe
  const updateRecipe = async (id, recipeData) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/recipes/${id}`, recipeData);
      
      // Update recipes state
      setRecipes(
        recipes.map((recipe) =>
          recipe._id === id ? res.data.data : recipe
        )
      );
      
      // Update current recipe if it's the one being edited
      if (recipe && recipe._id === id) {
        setRecipe(res.data.data);
      }
      
      toast.success('Recipe updated successfully');
      return res.data.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating recipe');
      toast.error('Error updating recipe');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete recipe
  const deleteRecipe = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/recipes/${id}`);
      
      // Update recipes state
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
      
      toast.success('Recipe deleted successfully');
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting recipe');
      toast.error('Error deleting recipe');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Search recipes
  const searchRecipes = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/recipes/search?query=${query}`);
      setRecipes(res.data.data);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error searching recipes');
      toast.error('Error searching recipes');
    } finally {
      setLoading(false);
    }
  };

  // Clear current recipe
  const clearRecipe = () => {
    setRecipe(null);
  };

  // Automatically load recipes when page loads
  useEffect(() => {
    const loadInitialRecipes = async () => {
      try {
        console.log('Loading initial recipes on page load...');
        await getRecipes();
      } catch (err) {
        console.error('Failed to load initial recipes:', err);
      }
    };
    
    loadInitialRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        recipe,
        loading,
        error,
        getRecipes,
        getRecipe,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        searchRecipes,
        clearRecipe
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
