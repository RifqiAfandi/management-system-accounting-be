const express = require('express');
const router = express.Router();

// Import auth routes
const authRoutes = require('./authRoute');
const dailyOperationalCostRoutes = require('./dailyOperationalCostRoute');
const dailyPerformanceTargetRoutes = require('./dailyPerformanceTargetRoute');
const operationalCostTypeRoutes = require('./operationalCostTypeRoute');
const paymentMethodBreakdownRoutes = require('./paymentMethodBreakdownRoute');
const paymentTypeRoutes = require('./paymentTypeRoute');
const salesByCategoryRoutes = require('./salesByCategoryRoute');
const salesCategoryRoutes = require('./salesCategoryRoute');
const trafficAndCustomerRoutes = require('./trafficAndCustomerRoute');

// Use auth routes
router.use('/auth', authRoutes);
router.use('/daily-operational-cost', dailyOperationalCostRoutes);
router.use('/daily-performance-target', dailyPerformanceTargetRoutes);
router.use('/operational-cost-type', operationalCostTypeRoutes);
router.use('/payment-method-breakdown', paymentMethodBreakdownRoutes);
router.use('/payment-type', paymentTypeRoutes);
router.use('/sales-by-category', salesByCategoryRoutes);
router.use('/sales-category', salesCategoryRoutes);
router.use('/traffic-and-customer', trafficAndCustomerRoutes);

module.exports = router;
