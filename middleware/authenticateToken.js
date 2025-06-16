const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

const authenticateToken = async (req, res, next) => {
  try {
    console.log('Authentication middleware called'); // Debug log
    console.log('Request headers:', req.headers); // Debug log
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    console.log('Auth header:', authHeader); // Debug log
    console.log('Extracted token:', token ? 'Token found' : 'No token'); // Debug log

    if (!token) {
      console.log('No token provided'); // Debug log
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log('Token decoded successfully:', decoded); // Debug log
    
    // Get user from database to ensure user still exists
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      console.log('User not found for token'); // Debug log
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    // Add user info to request object
    req.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };

    console.log('Authentication successful for user:', req.user); // Debug log
    next();
  } catch (error) {
    console.error('Authentication error:', error); // Debug log
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Token verification failed.',
      error: error.message
    });
  }
};

module.exports = authenticateToken;
