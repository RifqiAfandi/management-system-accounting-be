const express = require('express');
const router = express.Router();
const BalanceSheetController = require('../controllers/balanceSheetController');
const authenticateToken = require('../middleware/authenticateToken');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Balance Sheet routes
router.get('/balance-sheet', BalanceSheetController.getBalanceSheet);
router.get('/trial-balance', BalanceSheetController.getTrialBalance);
router.get('/financial-ratios', BalanceSheetController.getFinancialRatios);

// Automatic journal entries
router.post('/create-automatic-entries', BalanceSheetController.createAutomaticJournalEntries);

module.exports = router;
