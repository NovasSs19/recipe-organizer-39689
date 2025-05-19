import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import { AnimationProvider } from './context/AnimationContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
// Import axios config to set up interceptors
import './utils/axiosConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <AnimationProvider>
            <App />
          </AnimationProvider>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
