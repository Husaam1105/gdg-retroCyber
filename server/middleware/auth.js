const jwt = require('jsonwebtoken');

/**
 * JWT Authentication middleware
 * Verifies the presence and validity of JWT tokens in requests
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'ACCESS_DENIED: Authentication token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'INVALID_TOKEN: Authentication failed' 
      });
    }
    
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };