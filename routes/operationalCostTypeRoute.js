const express = require('express');
const router = express.Router();
const operationalCostTypeController = require('../controllers/operationalCostTypeController');
const authenticateToken = require('../middleware/authenticateToken');

// Operational cost type routes (protected with authentication)
router.get('/', authenticateToken, operationalCostTypeController.getAllOperationalCostTypes);

module.exports = router;
