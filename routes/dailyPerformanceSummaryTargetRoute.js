const express = require('express');
const router = express.Router();
const dailyPerformanceSummaryTargetController = require('../controllers/dailyPerformanceSummaryTargetController');

// Daily performance summary target routes
router.get('/', dailyPerformanceSummaryTargetController.getAllDailyPerformanceSummaryTargets);

module.exports = router;
