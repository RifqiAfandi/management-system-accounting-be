const express = require('express');
const router = express.Router();
const dailyPerformanceTargetController = require('../controllers/dailyPerformanceTargetController');

// Daily performance target routes
router.get('/', dailyPerformanceTargetController.getAllDailyPerformanceTargets);

module.exports = router;
