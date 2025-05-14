import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SplashScreen from './components/SplashScreen';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Private Route
import PrivateRoute from './components/PrivateRoute';

// Context
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Check loading state for splash screen
  useEffect(() => {
    // First start the fade-out animation
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2100);
    
    // Then remove the splash screen
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3300); // Slightly shorter duration for animation
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(loadingTimer);
    };
  }, []);
  // Create luxury background effects
  useEffect(() => {
    // Gold shimmer effect
    const createGoldSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.classList.add('gold-sparkle');
      document.body.appendChild(sparkle);
    };
    
    // Luxury lines effect
    const createLuxuryLines = () => {
      const luxuryLines = document.createElement('div');
      luxuryLines.classList.add('luxury-lines');
      document.body.appendChild(luxuryLines);
    };
    
    // Gold glow effect
    const createGoldGlow = () => {
      const goldGlow = document.createElement('div');
      goldGlow.classList.add('gold-glow');
      document.body.appendChild(goldGlow);
    };
    
    createGoldSparkle();
    createLuxuryLines();
    createGoldGlow();
    
    return () => {
      const sparkle = document.querySelector('.gold-sparkle');
      const luxuryLines = document.querySelector('.luxury-lines');
      const goldGlow = document.querySelector('.gold-glow');
      if (sparkle) document.body.removeChild(sparkle);
      if (luxuryLines) document.body.removeChild(luxuryLines);
      if (goldGlow) document.body.removeChild(goldGlow);
    };
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <RecipeProvider>
          {loading ? (
            <SplashScreen fadeOut={fadeOut} />
          ) : (
            <>
              <div className="bg-animation">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <Header />
              <main className="container py-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/recipes/:id" element={<RecipeDetails />} />
                  <Route path="/add-recipe" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
                  <Route path="/edit-recipe/:id" element={<PrivateRoute><EditRecipe /></PrivateRoute>} />
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <ToastContainer position="bottom-right" />
            </>
          )}
        </RecipeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
