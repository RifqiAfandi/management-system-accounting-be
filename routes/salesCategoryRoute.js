const express = require('express');
const router = express.Router();
const salesCategoryController = require('../controllers/salesCategoryController');

// Sales category routes
router.get('/', salesCategoryController.getAllSalesCategories);

module.exports = router;
