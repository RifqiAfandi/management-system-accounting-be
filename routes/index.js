const express = require('express');
const router = express.Router();

// Import auth routes
const authRoutes = require('./authRoute');
const dailyOperationalCostRoutes = require('./dailyOperationalCostRoute');
const dailyPerformanceTargetRoutes = require('./dailyPerformanceTargetRoute');

// Use auth routes
router.use('/auth', authRoutes);
router.use('/daily-operational-cost', dailyOperationalCostRoutes);
router.use('/daily-performance-target', dailyPerformanceTargetRoutes);

module.exports = router;
