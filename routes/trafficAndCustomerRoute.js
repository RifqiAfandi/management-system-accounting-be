const express = require('express');
const router = express.Router();
const trafficAndCustomerController = require('../controllers/trafficAndCustomerController');

// Get traffic and customer data by date
router.get('/by-date', trafficAndCustomerController.getDataByDate);

// Get all traffic and customer data
router.get('/', trafficAndCustomerController.getAllData);

// Create new traffic and customer data
router.post('/', trafficAndCustomerController.createData);

// Get available dates
router.get('/dates', trafficAndCustomerController.getAvailableDates);

module.exports = router;