const express = require('express');
const router = express.Router();
const dailyPerformanceSummaryController = require('../controllers/dailyPerformanceSummaryController');

// Daily performance summary routes
router.get('/', dailyPerformanceSummaryController.getAllDailyPerformanceSummaries);
router.get('/:id', dailyPerformanceSummaryController.getDailyPerformanceSummaryById);
router.post('/', dailyPerformanceSummaryController.createDailyPerformanceSummary);
router.put('/:id', dailyPerformanceSummaryController.updateDailyPerformanceSummary);
router.delete('/:id', dailyPerformanceSummaryController.deleteDailyPerformanceSummary);

module.exports = router;
