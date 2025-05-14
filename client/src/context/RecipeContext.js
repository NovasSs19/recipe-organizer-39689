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
    try {
      let queryString = '';
      
      // Build query string from filters
      if (Object.keys(filters).length > 0) {
        queryString = '?' + new URLSearchParams(filters).toString();
      }
      
      const res = await axios.get(`/api/recipes${queryString}`);
      setRecipes(res.data.data);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching recipes');
      toast.error('Error fetching recipes');
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
    setLoading(true);
    try {
      const res = await axios.post('/api/recipes', recipeData);
      setRecipes([...recipes, res.data.data]);
      toast.success('Recipe created successfully');
      return res.data.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating recipe');
      toast.error('Error creating recipe');
      return null;
    } finally {
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
