const express = require('express');
const router = express.Router();
const dailyPerformanceSummaryController = require('../controllers/dailyPerformanceSummaryController');
const authenticateToken = require('../middleware/authenticateToken');

// Daily performance summary routes
router.get('/by-date', authenticateToken, dailyPerformanceSummaryController.getDailyPerformanceSummaryByDate);
router.get('/dates', authenticateToken, dailyPerformanceSummaryController.getAvailableDates);
router.get('/', authenticateToken, dailyPerformanceSummaryController.getAllDailyPerformanceSummaries);
router.get('/:id', authenticateToken, dailyPerformanceSummaryController.getDailyPerformanceSummaryById);
router.post('/', authenticateToken, dailyPerformanceSummaryController.createDailyPerformanceSummary);
router.put('/:id', authenticateToken, dailyPerformanceSummaryController.updateDailyPerformanceSummary);
router.delete('/:id', authenticateToken, dailyPerformanceSummaryController.deleteDailyPerformanceSummary);

module.exports = router;
