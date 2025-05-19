import axios from 'axios';

// Base URL configuration
axios.defaults.baseURL = 'http://localhost:5050'; // Backend server URL

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add Content-Type header if not present
    if (!config.headers['Content-Type'] && !config.headers.get('Content-Type')) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    // Log request in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axios.interceptors.response.use(
  (response) => {
    // Log successful responses in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Log error details
    console.error('API Error:', error.response || error);
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear token
      localStorage.removeItem('token');
      
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios;
