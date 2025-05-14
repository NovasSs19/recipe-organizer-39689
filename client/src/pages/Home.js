import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };
  const { recipes, loading, getRecipes } = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getRecipes({ 
      ...(searchTerm && { search: searchTerm }),
      ...(category && { category })
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    setCategory('');
    getRecipes();
  };

  return (
    <Container as={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm" style={{ backgroundColor: '#fff', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <Card.Body style={{ backgroundColor: '#fff', color: '#000' }}>
              <motion.div variants={headerVariants}>
                <h1 className="text-center mb-4">Recipe Organizer</h1>
              <motion.p 
                className="text-center lead"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Browse our collection of delicious recipes for breakfast, lunch, and dinner
              </motion.p>
              </motion.div>
              <Form onSubmit={handleSearch}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Search recipes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="dessert">Dessert</option>
                      <option value="snack">Snack</option>
                    </Form.Select>
                  </Col>
                  <Col md={3} className="d-flex">
                    <Button type="submit" variant="primary" className="me-2 flex-grow-1">
                      Search
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary" 
                      onClick={handleClear}
                      className="flex-grow-1"
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <h3>Loading recipes...</h3>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-5">
          <Card 
            className="mx-auto" 
            style={{ 
              maxWidth: '600px', 
              backgroundColor: 'rgba(20, 20, 20, 0.7)', 
              borderColor: 'rgba(212, 175, 55, 0.3)', 
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)' 
            }}
          >
            <Card.Body className="py-5">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 style={{ color: '#d4af37', fontFamily: 'Playfair Display, serif', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2rem', marginRight: '10px' }}>✨</span>
                  No Recipes Found
                </h3>
                <p style={{ color: '#fff', fontSize: '1.1rem', opacity: 0.9 }}>
                  Try a different search or add a new recipe to your collection
                </p>
                <motion.div 
                  className="mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline-warning" 
                    size="lg"
                    href="/add-recipe"
                    style={{ 
                      borderColor: '#d4af37', 
                      color: '#d4af37',
                      padding: '10px 30px',
                      fontWeight: '500'
                    }}
                  >
                    Add New Recipe
                  </Button>
                </motion.div>
              </motion.div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <motion.div ref={ref}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {recipes.map((recipe, index) => (
              <Col key={recipe._id}>
                <RecipeCard 
                  recipe={recipe} 
                  index={index} 
                  showDelete={true} 
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      )}
    </Container>
  );
};

export default Home;
