import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
    <Navbar bg="black" variant="dark" expand="lg" className="mb-4 shadow" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>
      <Container>
        <Navbar.Brand as={motion.div} whileHover={{ scale: 1.05 }}>
          <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="me-2"
              style={{ color: '#ffd700' }}
            >
              🌟
            </motion.span>
            <span style={{ 
              background: 'linear-gradient(to right, #d4af37, #ffd700)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '600',
              letterSpacing: '1px',
              textShadow: '0 0 5px rgba(212, 175, 55, 0.3)'
            }}>Recipe Organizer</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={motion.div} variants={linkVariants} whileHover="hover">
              <Link to="/" className="text-decoration-none text-white">Home</Link>
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={motion.div} variants={linkVariants} whileHover="hover">
                  <Link to="/add-recipe" className="text-decoration-none text-white">Add Recipe</Link>
                </Nav.Link>
                <Nav.Link as={motion.div} variants={linkVariants} whileHover="hover">
                  <Link to="/dashboard" className="text-decoration-none text-white">Dashboard</Link>
                </Nav.Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline-warning" 
                    className="ms-2" 
                    onClick={handleLogout}
                    style={{ 
                      borderColor: '#d4af37', 
                      color: '#d4af37',
                      fontWeight: '500'
                    }}
                  >
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <Nav.Link as={motion.div} variants={linkVariants} whileHover="hover">
                  <Link to="/login" className="text-decoration-none text-white">Login</Link>
                </Nav.Link>
                <Nav.Link as={motion.div} variants={linkVariants} whileHover="hover">
                  <Link to="/register" className="text-decoration-none text-white">Register</Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </motion.div>
  );
};

export default Header;
