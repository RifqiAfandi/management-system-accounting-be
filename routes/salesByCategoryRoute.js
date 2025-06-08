const express = require('express');
const router = express.Router();
const salesByCategoryController = require('../controllers/salesByCategoryController');

// Sales by category routes
router.post('/', salesByCategoryController.createSalesByCategory);
router.get('/', salesByCategoryController.getAllSalesByCategory);
router.put('/:id', salesByCategoryController.updateSalesByCategory);
router.delete('/:id', salesByCategoryController.deleteSalesByCategory);

module.exports = router;
