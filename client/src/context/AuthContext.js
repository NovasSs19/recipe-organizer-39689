import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Token değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Not: axios headers artık axiosConfig.js'de yönetiliyor
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Check if user is logged in
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/users/me');
        setUser(res.data.data);
      } catch (error) {
        localStorage.removeItem('token');
        setToken(null);
        toast.error('Session expired. Please login again.');
      }

      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/users/register', userData);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'An error occurred during registration'
      );
      return false;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post('/api/users/login', userData);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Invalid credentials'
      );
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
