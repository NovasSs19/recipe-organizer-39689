import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { toast } from 'react-toastify';

const AddRecipe = () => {
  const { createRecipe, loading } = useContext(RecipeContext);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    ingredients: [''],
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const removeIngredientField = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients.splice(index, 1);
      setFormData({ ...formData, ingredients: updatedIngredients });
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      ingredients: [''],
      instructions: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      difficulty: 'Medium',
      imageUrl: ''
    });
    setValidated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // First check form data
    const formErrors = [];
    
    if (!formData.title) formErrors.push('Recipe title');
    if (!formData.category) formErrors.push('Category');
    if (!formData.instructions) formErrors.push('Instructions');
    if (!formData.prepTime) formErrors.push('Preparation time');
    if (!formData.cookTime) formErrors.push('Cooking time');
    if (!formData.servings) formErrors.push('Servings');
    
    // Filter empty ingredients
    const filteredIngredients = formData.ingredients.filter(
      ingredient => ingredient.trim() !== ''
    );
    
    if (filteredIngredients.length === 0) formErrors.push('Ingredients');
    
    // Show errors if any
    if (formErrors.length > 0) {
      setValidated(true);
      toast.error(`Please fill in the following fields: ${formErrors.join(', ')}`);
      return;
    }
    
    // Start form submission process
    setSubmitting(true);
    console.log('Form validation passed, submitting data...');
    
    try {
      // Prepare clean data
      const recipeData = {
        ...formData,
        ingredients: filteredIngredients,
        prepTime: parseInt(formData.prepTime) || 0,
        cookTime: parseInt(formData.cookTime) || 0,
        servings: parseInt(formData.servings) || 1
      };
      
      console.log('Sending recipe data:', recipeData);
      
      // Send API request
      const newRecipe = await createRecipe(recipeData);
      
      // Check successful response
      if (newRecipe && newRecipe._id) {
        console.log('Recipe created successfully:', newRecipe);
        toast.success('Recipe created successfully!');
        resetForm(); // Reset form
        navigate(`/recipes/${newRecipe._id}`);
      } else {
        // API responded but expected data is missing
        console.error('Invalid recipe response:', newRecipe);
        toast.error('Error creating recipe');
      }
    } catch (error) {
      console.error('Recipe submission error:', error);
      toast.error('Error creating recipe: ' + (error.message || 'Unknown error'));
    } finally {
      console.log('Form submission completed');
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow" style={{ backgroundColor: '#fff', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <Card.Body style={{ backgroundColor: '#fff', color: '#000' }}>
              <h2 className="text-center mb-4">Add New Recipe</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Recipe Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter recipe title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a recipe title.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a category.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="ingredients">
                  <Form.Label>Ingredients</Form.Label>
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        placeholder={`Ingredient ${index + 1}`}
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        required={index === 0}
                      />
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => removeIngredientField(index)}
                        disabled={formData.ingredients.length === 1 && index === 0}
                      >
                        -
                      </Button>
                      {index === formData.ingredients.length - 1 && (
                        <Button
                          variant="outline-success"
                          className="ms-2"
                          onClick={addIngredientField}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  ))}
                  <Form.Control.Feedback type="invalid">
                    Please add at least one ingredient.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="instructions">
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter cooking instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide cooking instructions.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="prepTime">
                      <Form.Label>Prep Time (minutes)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Prep time"
                        name="prepTime"
                        value={formData.prepTime}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid prep time.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="cookTime">
                      <Form.Label>Cook Time (minutes)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Cook time"
                        name="cookTime"
                        value={formData.cookTime}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid cook time.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="servings">
                      <Form.Label>Servings</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Number of servings"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid number of servings.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="difficulty">
                      <Form.Label>Difficulty</Form.Label>
                      <Form.Select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="imageUrl">
                      <Form.Label>Image URL (optional)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/')}
                    className="me-md-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={submitting || loading}
                    className={`${submitting || loading ? 'btn-loading' : ''} create-recipe-btn`}
                    style={{ position: 'relative' }}
                  >
                    {submitting || loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : 'Create Recipe'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;
