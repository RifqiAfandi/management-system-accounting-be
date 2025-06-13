const express = require('express');
const router = express.Router();
const dailyPerformanceSummaryMetricController = require('../controllers/dailyPerformanceSummaryMetricController');
const authenticateToken = require('../middleware/authenticateToken');

// Daily performance summary metric routes
router.get('/', authenticateToken, dailyPerformanceSummaryMetricController.getAllDailyPerformanceSummaryMetrics);

module.exports = router;
