const express = require('express');
const router = express.Router();
const dailyOperationalCostController = require('../controllers/dailyOperationalCostController');

// Daily operational cost routes
router.post('/', dailyOperationalCostController.createDailyOperationalCost);
router.get('/', dailyOperationalCostController.getAllDailyOperationalCost);
router.put('/:id', dailyOperationalCostController.updateDailyOperationalCost);
router.delete('/:id', dailyOperationalCostController.deleteDailyOperationalCost);

module.exports = router;
