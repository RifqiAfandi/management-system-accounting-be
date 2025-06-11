const express = require('express');
const router = express.Router();
const trafficAndCustomerController = require('../controllers/trafficAndCustomerController');
const authenticateToken = require('../middleware/authenticateToken');

// Get traffic and customer data by date
router.get('/by-date', authenticateToken, trafficAndCustomerController.getDataByDate);

// Get all traffic and customer data
router.get('/', authenticateToken, trafficAndCustomerController.getAllData);

// Create new traffic and customer data
router.post('/', authenticateToken, trafficAndCustomerController.createData);

// Get available dates
router.get('/dates', authenticateToken, trafficAndCustomerController.getAvailableDates);

module.exports = router;