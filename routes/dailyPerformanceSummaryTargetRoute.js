const express = require('express');
const router = express.Router();
const dailyPerformanceSummaryTargetController = require('../controllers/dailyPerformanceSummaryTargetController');
const authenticateToken = require('../middleware/authenticateToken');

// Daily performance summary target routes
router.get('/', authenticateToken, dailyPerformanceSummaryTargetController.getAllDailyPerformanceSummaryTargets);

module.exports = router;
