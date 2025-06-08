const express = require('express');
const router = express.Router();

// Import auth routes
const authRoutes = require('./authRoute');
const dailyOperationalCostRoutes = require('./dailyOperationalCostRoute');
const dailyPerformanceTargetRoutes = require('./dailyPerformanceTargetRoute');
const operationalCostTypeRoutes = require('./operationalCostTypeRoute');
const paymentMethodBreakdownRoutes = require('./paymentMethodBreakdownRoute');

// Use auth routes
router.use('/auth', authRoutes);
router.use('/daily-operational-cost', dailyOperationalCostRoutes);
router.use('/daily-performance-target', dailyPerformanceTargetRoutes);
router.use('/operational-cost-type', operationalCostTypeRoutes);
router.use('/payment-method-breakdown', paymentMethodBreakdownRoutes);

module.exports = router;
