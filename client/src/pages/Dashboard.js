import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { recipes, loading, getRecipes, deleteRecipe } = useContext(RecipeContext);
  const { user } = useContext(AuthContext);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (user) {
        await getRecipes();
      }
    };
    
    fetchUserRecipes();
  }, [user]);

  useEffect(() => {
    if (recipes.length > 0 && user) {
      // Filter recipes created by the current user
      const filtered = recipes.filter(recipe => recipe.createdBy === user.id);
      
      // Apply category filter if selected
      if (categoryFilter) {
        setUserRecipes(filtered.filter(recipe => recipe.category === categoryFilter));
      } else {
        setUserRecipes(filtered);
      }
    }
  }, [recipes, user, categoryFilter]);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    setShowConfirmDelete(null);
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

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h3>Loading your recipes...</h3>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm" style={{ backgroundColor: '#fff', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <Card.Body style={{ backgroundColor: '#fff', color: '#000' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">My Recipes</h2>
                <Link to="/add-recipe" className="btn btn-success">
                  <FaPlus className="me-1" /> Add New Recipe
                </Link>
              </div>
              
              <Form.Group className="mb-4">
                <Form.Label>Filter by Category</Form.Label>
                <Form.Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                </Form.Select>
              </Form.Group>

              {userRecipes.length === 0 ? (
                <div className="text-center py-4">
                  <h4 style={{ color: '#d4af37', fontFamily: 'Playfair Display, serif' }}>You haven't created any recipes yet</h4>
                  <p style={{ fontSize: '1.1rem' }}>Get started by adding your first recipe!</p>
                  <Link to="/add-recipe" className="btn mt-2" style={{ 
                    backgroundColor: '#d4af37', 
                    color: '#000',
                    borderColor: '#d4af37',
                    fontWeight: '500',
                    padding: '8px 20px'
                  }}>
                    Add Recipe
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Prep Time</th>
                        <th>Cook Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRecipes.map((recipe) => (
                        <tr key={recipe._id}>
                          <td>{recipe.title}</td>
                          <td>
                            <Badge bg={getCategoryColor(recipe.category)}>
                              {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
                            </Badge>
                          </td>
                          <td>{recipe.prepTime} min</td>
                          <td>{recipe.cookTime} min</td>
                          <td>
                            <div className="d-flex">
                              <Link
                                to={`/recipes/${recipe._id}`}
                                className="btn btn-sm btn-outline-primary me-1"
                                title="View Recipe"
                              >
                                <FaEye />
                              </Link>
                              <Link
                                to={`/edit-recipe/${recipe._id}`}
                                className="btn btn-sm btn-outline-secondary me-1"
                                title="Edit Recipe"
                              >
                                <FaEdit />
                              </Link>
                              {showConfirmDelete === recipe._id ? (
                                <>
                                  <Button
                                    variant="sm btn-danger me-1"
                                    onClick={() => handleDelete(recipe._id)}
                                    title="Confirm Delete"
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    variant="sm btn-secondary"
                                    onClick={() => setShowConfirmDelete(null)}
                                    title="Cancel"
                                  >
                                    No
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="sm btn-outline-danger"
                                  onClick={() => setShowConfirmDelete(recipe._id)}
                                  title="Delete Recipe"
                                >
                                  <FaTrash />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
