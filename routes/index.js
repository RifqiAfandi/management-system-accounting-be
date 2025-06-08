const express = require('express');
const router = express.Router();

// Import auth routes
const authRoutes = require('./authRoute');
const dailyOperationalCostRoutes = require('./dailyOperationalCostRoute');

// Use auth routes
router.use('/auth', authRoutes);
router.use('/daily-operational-cost', dailyOperationalCostRoutes);

module.exports = router;
