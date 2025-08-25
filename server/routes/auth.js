const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * User Registration Endpoint
 * Creates a new user account with hashed password
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'ERROR: Username and password required'
      });
    }

    if (username.length < 3 || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'ERROR: Username min 3 chars, password min 6 chars'
      });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'ERROR: User already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, passwordHash]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: newUser.rows[0].id, 
        username: newUser.rows[0].username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'REGISTRATION_SUCCESSFUL: Welcome to the system',
      data: {
        token,
        user: {
          id: newUser.rows[0].id,
          username: newUser.rows[0].username,
          joinedAt: newUser.rows[0].created_at
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'SYSTEM_ERROR: Registration failed'
    });
  }
});

/**
 * User Login Endpoint
 * Authenticates user credentials and returns JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'ERROR: Username and password required'
      });
    }

    // Find user
    const user = await pool.query(
      'SELECT id, username, password_hash, created_at FROM users WHERE username = $1',
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'AUTHENTICATION_FAILED: Invalid credentials'
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'AUTHENTICATION_FAILED: Invalid credentials'
      });
    }

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.rows[0].id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.rows[0].id, 
        username: user.rows[0].username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'LOGIN_SUCCESSFUL: Access granted',
      data: {
        token,
        user: {
          id: user.rows[0].id,
          username: user.rows[0].username,
          joinedAt: user.rows[0].created_at
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'SYSTEM_ERROR: Login failed'
    });
  }
});

/**
 * Token Verification Endpoint
 * Validates JWT tokens and returns user information
 */
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, username, created_at, last_login FROM users WHERE id = $1',
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'USER_NOT_FOUND: Invalid token'
      });
    }

    res.json({
      success: true,
      message: 'TOKEN_VALID: Authentication verified',
      data: {
        user: user.rows[0]
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'SYSTEM_ERROR: Verification failed'
    });
  }
});

module.exports = router;