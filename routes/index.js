const express = require('express');
const router = express.Router();

// Import auth routes
const authRoutes = require('./authRoute');

// Use auth routes
router.use('/auth', authRoutes);

module.exports = router;
