const express = require('express');
const router = express.Router();

// Import auth routes
const authRoutes = require('./authRoute');
const dailyOperationalCostRoutes = require('./dailyOperationalCostRoute');
const dailyPerformanceSummaryRoutes = require('./dailyPerformanceSummaryRoute');
const dailyPerformanceSummaryMetricRoutes = require('./dailyPerformanceSummaryMetricRoute');
const dailyPerformanceSummaryTargetRoutes = require('./dailyPerformanceSummaryTargetRoute');
const operationalCostTypeRoutes = require('./operationalCostTypeRoute');
const paymentMethodBreakdownRoutes = require('./paymentMethodBreakdownRoute');
const paymentTypeRoutes = require('./paymentTypeRoute');
const salesByCategoryRoutes = require('./salesByCategoryRoute');
const salesCategoryRoutes = require('./salesCategoryRoute');
const trafficAndCustomerRoutes = require('./trafficAndCustomerRoute');

// Import balance sheet routes
const balanceSheetRoutes = require('./balanceSheetRoute');
const chartOfAccountsRoutes = require('./chartOfAccountsRoute');

// Use auth routes
router.use('/auth', authRoutes);
router.use('/daily-operational-cost', dailyOperationalCostRoutes);
router.use('/daily-performance-summary', dailyPerformanceSummaryRoutes);
router.use('/daily-performance-summary-metric', dailyPerformanceSummaryMetricRoutes);
router.use('/daily-performance-summary-target', dailyPerformanceSummaryTargetRoutes);
router.use('/operational-cost-type', operationalCostTypeRoutes);
router.use('/payment-method-breakdown', paymentMethodBreakdownRoutes);
router.use('/payment-type', paymentTypeRoutes);
router.use('/sales-by-category', salesByCategoryRoutes);
router.use('/sales-category', salesCategoryRoutes);
router.use('/traffic-and-customer', trafficAndCustomerRoutes);

// Use balance sheet routes
router.use('/accounting', balanceSheetRoutes);
router.use('/chart-of-accounts', chartOfAccountsRoutes);

module.exports = router;
