const express = require('express');
const router = express.Router();
const paymentTypeController = require('../controllers/paymentTypeController');

// Payment type routes
router.get('/', paymentTypeController.getAllPaymentTypes);

module.exports = router;
