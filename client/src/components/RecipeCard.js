import React, { useContext } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaTrashAlt } from 'react-icons/fa';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const RecipeCard = ({ recipe, index, showDelete }) => {
  const { deleteRecipe } = useContext(RecipeContext);
  const { user } = useContext(AuthContext);
  
  // Recipe deletion function
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        // Show loading toast
        const toastId = toast.loading('Deleting recipe...');
        
        // Call the deleteRecipe function
        const success = await deleteRecipe(recipe._id);
        
        // Update toast based on result
        if (success) {
          toast.update(toastId, { 
            render: 'Recipe deleted successfully', 
            type: 'success', 
            isLoading: false,
            autoClose: 2000
          });
        } else {
          toast.update(toastId, { 
            render: 'Failed to delete recipe', 
            type: 'error', 
            isLoading: false,
            autoClose: 2000
          });
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
        toast.error('An error occurred while deleting the recipe');
      }
    }
  };
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(212, 175, 55, 0.3)',
      transition: {
        duration: 0.3
      }
    }
  };
  // Function to get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'breakfast':
        return 'primary';
      case 'lunch':
        return 'success';
      case 'dinner':
        return 'danger';
      case 'dessert':
        return 'warning';
      case 'snack':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <motion.div
      className="h-100"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      custom={index || 0}
      data-aos="fade-up"
      data-aos-delay={index ? index * 100 : 0}
    >
    <Card className="recipe-card h-100 border-0 shadow-sm" style={{ backgroundColor: 'rgba(20, 20, 20, 0.7)', borderColor: 'rgba(212, 175, 55, 0.3)', color: '#fff' }}>
      <div style={{ position: 'relative' }}>
        <Card.Img 
          variant="top" 
          src={recipe.imageUrl || 'https://via.placeholder.com/300x200?text=Recipe+Image'} 
          alt={recipe.title}
        />
        <Badge 
          bg={getCategoryColor(recipe.category)} 
          style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px',
            fontSize: '0.8rem',
            padding: '0.35em 0.65em'
          }}
        >
          {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
        </Badge>
      </div>
      
      <Card.Body>
        <Card.Title style={{ color: '#d4af37', marginBottom: '15px' }}>{recipe.title}</Card.Title>
        
        <Card.Text style={{ marginBottom: '15px', fontSize: '0.9rem' }}>
          {recipe.ingredients.slice(0, 3).join(', ')}
          {recipe.ingredients.length > 3 && '...'}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '10px' }}>
          <div className="d-flex align-items-center">
            <FaClock className="me-1" />
            <small>{recipe.prepTime + recipe.cookTime} min</small>
          </div>
          <div className="d-flex align-items-center">
            <FaUtensils className="me-1" />
            <small>{recipe.servings} servings</small>
          </div>
        </div>
      </Card.Body>
      
      <div style={{ 
        display: 'flex', 
        padding: '12px', 
        backgroundColor: 'rgba(20, 20, 20, 0.7)', 
        borderTop: '1px solid rgba(212, 175, 55, 0.2)' 
      }}>
        <Link 
          to={`/recipes/${recipe._id}`} 
          className="btn"
          style={{ 
            backgroundColor: '#d4af37', 
            color: '#000',
            borderColor: '#d4af37',
            fontWeight: '500',
            flex: '1',
            fontSize: '0.9rem',
            padding: '8px 12px',
            marginRight: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          View Recipe
        </Link>
        
        <Button 
          variant="danger" 
          onClick={handleDelete}
          style={{ 
            width: '38px', 
            minWidth: '38px',
            height: '38px',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px'
          }}
        >
          <FaTrashAlt size={14} />
        </Button>
      </div>
    </Card>
    </motion.div>
  );
};

export default RecipeCard;
