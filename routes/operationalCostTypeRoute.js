const express = require('express');
const router = express.Router();
const operationalCostTypeController = require('../controllers/operationalCostTypeController');

// Operational cost type routes
router.get('/', operationalCostTypeController.getAllOperationalCostTypes);

module.exports = router;
