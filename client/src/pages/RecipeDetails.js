import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaEdit, FaTrash } from 'react-icons/fa';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipe, recipe, loading, deleteRecipe } = useContext(RecipeContext);
  const { user } = useContext(AuthContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    getRecipe(id);
  }, [id]);

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

  const handleDelete = async () => {
    const success = await deleteRecipe(id);
    if (success) {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h3>Loading recipe details...</h3>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container className="py-5 text-center">
        <h3>Recipe not found</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Recipes
        </Link>
      </Container>
    );
  }

  const isOwner = user && recipe.createdBy === user.id;

  return (
    <Container className="py-4 recipe-details">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow">
            <Card.Img 
              variant="top" 
              src={recipe.imageUrl || 'https://via.placeholder.com/800x400?text=Recipe+Image'} 
              alt={recipe.title}
            />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">{recipe.title}</h1>
                <Badge bg={getCategoryColor(recipe.category)} className="px-3 py-2">
                  {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
                </Badge>
              </div>

              <div className="recipe-info mb-4">
                <span>
                  <FaClock /> Prep: {recipe.prepTime} min
                </span>
                <span>
                  <FaClock /> Cook: {recipe.cookTime} min
                </span>
                <span>
                  <FaUtensils /> Servings: {recipe.servings}
                </span>
                <span>
                  Difficulty: {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                </span>
              </div>

              <h4>Ingredients</h4>
              <ListGroup variant="flush" className="mb-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
                ))}
              </ListGroup>

              <h4>Instructions</h4>
              <Card.Text className="mb-4">
                {recipe.instructions.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </Card.Text>

              {isOwner && (
                <div className="d-flex mt-4">
                  <Link 
                    to={`/edit-recipe/${recipe._id}`} 
                    className="btn btn-primary me-2"
                  >
                    <FaEdit className="me-1" /> Edit Recipe
                  </Link>
                  {!showConfirmDelete ? (
                    <Button 
                      variant="danger" 
                      onClick={() => setShowConfirmDelete(true)}
                    >
                      <FaTrash className="me-1" /> Delete Recipe
                    </Button>
                  ) : (
                    <div className="d-flex">
                      <Button 
                        variant="danger" 
                        onClick={handleDelete} 
                        className="me-2"
                      >
                        Confirm Delete
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => setShowConfirmDelete(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/" className="btn btn-outline-primary">
                Back to Recipes
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetails;
