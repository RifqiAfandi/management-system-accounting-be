const express = require('express');
const router = express.Router();
const paymentMethodBreakdownController = require('../controllers/paymentMethodBreakdownController');

// Payment method breakdown routes
router.post('/', paymentMethodBreakdownController.createPaymentMethodBreakdown);
router.get('/', paymentMethodBreakdownController.getAllPaymentMethodBreakdowns);
router.put('/:id', paymentMethodBreakdownController.updatePaymentMethodBreakdown);
router.delete('/:id', paymentMethodBreakdownController.deletePaymentMethodBreakdown);

module.exports = router;
