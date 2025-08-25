import { useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

/**
 * Authentication Hook
 * Manages user authentication state and operations
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Verify token with backend
  const verifyToken = async (token) => {
    try {
      const response = await authAPI.verifyToken(token);
      if (response.success) {
        setIsAuthenticated(true);
        setCurrentUser(response.data.user);
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      if (response.success) {
        localStorage.setItem('auth_token', response.data.token);
        setIsAuthenticated(true);
        setCurrentUser(response.data.user);
        return { success: true, message: response.message };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register user
  const register = async (username, password) => {
    try {
      const response = await authAPI.register(username, password);
      if (response.success) {
        localStorage.setItem('auth_token', response.data.token);
        setIsAuthenticated(true);
        setCurrentUser(response.data.user);
        return { success: true, message: response.message };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
    return { success: true, message: 'LOGOUT_SUCCESSFUL: Session terminated' };
  };

  return {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    register,
    logout
  };
};