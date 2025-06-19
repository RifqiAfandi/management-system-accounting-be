const express = require('express');
const router = express.Router();
const ChartOfAccountsController = require('../controllers/chartOfAccountsController');
const authenticateToken = require('../middleware/authenticateToken');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Chart of Accounts routes
router.get('/', ChartOfAccountsController.getAllAccounts);
router.get('/hierarchy', ChartOfAccountsController.getAccountHierarchy);
router.get('/type/:accountType', ChartOfAccountsController.getAccountsByType);
router.get('/:id', ChartOfAccountsController.getAccountById);
router.post('/', ChartOfAccountsController.createAccount);
router.put('/:id', ChartOfAccountsController.updateAccount);
router.delete('/:id', ChartOfAccountsController.deleteAccount);

module.exports = router;
