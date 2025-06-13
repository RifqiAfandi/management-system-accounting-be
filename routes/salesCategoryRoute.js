const express = require('express');
const router = express.Router();
const salesCategoryController = require('../controllers/salesCategoryController');
const authenticateToken = require('../middleware/authenticateToken');

// Sales category routes (all protected with authentication)
router.get('/by-date', authenticateToken, salesCategoryController.getSalesByCategoryByDate);
router.get('/dates', authenticateToken, salesCategoryController.getAvailableDates);
router.get('/', authenticateToken, salesCategoryController.getAllSalesCategories);
router.post('/', authenticateToken, salesCategoryController.createSalesCategory);
router.put('/:id', authenticateToken, salesCategoryController.updateSalesCategory);
router.delete('/:id', authenticateToken, salesCategoryController.deleteSalesCategory);

module.exports = router;
