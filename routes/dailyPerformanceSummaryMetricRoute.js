const express = require('express');
const router = express.Router();
const dailyPerformanceSummaryMetricController = require('../controllers/dailyPerformanceSummaryMetricController');

// Daily performance summary metric routes
router.get('/', dailyPerformanceSummaryMetricController.getAllDailyPerformanceSummaryMetrics);

module.exports = router;
