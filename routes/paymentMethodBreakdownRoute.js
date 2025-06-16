const express = require('express');
const router = express.Router();
const paymentMethodBreakdownController = require('../controllers/paymentMethodBreakdownController');
const authenticateToken = require('../middleware/authenticateToken');

// Payment method breakdown routes (all protected with authentication)
router.get('/by-date', authenticateToken, paymentMethodBreakdownController.getPaymentMethodBreakdownByDate);
router.get('/dates', authenticateToken, paymentMethodBreakdownController.getAvailableDates);
router.post('/', authenticateToken, paymentMethodBreakdownController.createPaymentMethodBreakdown);
router.get('/', authenticateToken, paymentMethodBreakdownController.getAllPaymentMethodBreakdowns);
router.put('/:id', authenticateToken, paymentMethodBreakdownController.updatePaymentMethodBreakdown);
router.delete('/:id', authenticateToken, paymentMethodBreakdownController.deletePaymentMethodBreakdown);

module.exports = router;
