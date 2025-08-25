import axios from 'axios';

// Configure axios defaults
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.reload();
    }
    throw error.response?.data || { message: 'Network error' };
  }
);

/**
 * Authentication API calls
 */
export const authAPI = {
  // User login
  login: async (username, password) => {
    return await api.post('/auth/login', { username, password });
  },

  // User registration
  register: async (username, password) => {
    return await api.post('/auth/register', { username, password });
  },

  // Token verification
  verifyToken: async (token) => {
    return await api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

/**
 * Secret/Puzzle API calls
 */
export const puzzleAPI = {
  // Get secret key (protected endpoint)
  revealSecret: async () => {
    return await api.get('/secret/reveal');
  },

  // Get puzzle status
  getStatus: async () => {
    return await api.get('/secret/status');
  }
};

/**
 * System API calls
 */
export const systemAPI = {
  // Health check
  healthCheck: async () => {
    return await api.get('/health');
  }
};

export default api;