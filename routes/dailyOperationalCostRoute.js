const express = require('express');
const router = express.Router();
const dailyOperationalCostController = require('../controllers/dailyOperationalCostController');
const authenticateToken = require('../middleware/authenticateToken');

// Daily operational cost routes (all protected with authentication)
router.get('/by-date', authenticateToken, dailyOperationalCostController.getDailyOperationalCostByDate);
router.get('/dates', authenticateToken, dailyOperationalCostController.getAvailableDates);
router.post('/', authenticateToken, dailyOperationalCostController.createDailyOperationalCost);
router.get('/', authenticateToken, dailyOperationalCostController.getAllDailyOperationalCost);
router.put('/:id', authenticateToken, dailyOperationalCostController.updateDailyOperationalCost);
router.delete('/:id', authenticateToken, dailyOperationalCostController.deleteDailyOperationalCost);

module.exports = router;
