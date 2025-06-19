const { Chart_of_accounts } = require('../models');
const { Op } = require('sequelize');

class ChartOfAccountsController {
  // Get all accounts
  static async getAllAccounts(req, res) {
    try {
      const { accountType, isActive, parentAccountId } = req.query;
      
      const whereClause = {};
      
      if (accountType) {
        whereClause.accountType = accountType;
      }
      
      if (isActive !== undefined) {
        whereClause.isActive = isActive === 'true';
      }
      
      if (parentAccountId) {
        whereClause.parentAccountId = parentAccountId;
      }

      const accounts = await Chart_of_accounts.findAll({
        where: whereClause,
        include: [
          {
            model: Chart_of_accounts,
            as: 'parentAccount',
            attributes: ['id', 'accountCode', 'accountName']
          },
          {
            model: Chart_of_accounts,
            as: 'childAccounts',
            attributes: ['id', 'accountCode', 'accountName', 'accountType']
          }
        ],
        order: [['accountCode', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: 'Chart of accounts retrieved successfully',
        data: accounts
      });
    } catch (error) {
      console.error('Error getting accounts:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get account by ID
  static async getAccountById(req, res) {
    try {
      const { id } = req.params;
      
      const account = await Chart_of_accounts.findByPk(id, {
        include: [
          {
            model: Chart_of_accounts,
            as: 'parentAccount',
            attributes: ['id', 'accountCode', 'accountName']
          },
          {
            model: Chart_of_accounts,
            as: 'childAccounts',
            attributes: ['id', 'accountCode', 'accountName', 'accountType']
          }
        ]
      });

      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Account retrieved successfully',
        data: account
      });
    } catch (error) {
      console.error('Error getting account:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Create new account
  static async createAccount(req, res) {
    try {
      const {
        accountCode,
        accountName,
        accountType,
        accountCategory,
        parentAccountId,
        isActive,
        normalBalance
      } = req.body;

      // Validate required fields
      if (!accountCode || !accountName || !accountType || !accountCategory || !normalBalance) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: accountCode, accountName, accountType, accountCategory, normalBalance'
        });
      }

      // Check if account code already exists
      const existingAccount = await Chart_of_accounts.findOne({
        where: { accountCode }
      });

      if (existingAccount) {
        return res.status(400).json({
          success: false,
          message: 'Account code already exists'
        });
      }

      // Validate parent account if provided
      if (parentAccountId) {
        const parentAccount = await Chart_of_accounts.findByPk(parentAccountId);
        if (!parentAccount) {
          return res.status(400).json({
            success: false,
            message: 'Parent account not found'
          });
        }
      }

      const account = await Chart_of_accounts.create({
        accountCode,
        accountName,
        accountType,
        accountCategory,
        parentAccountId: parentAccountId || null,
        isActive: isActive !== undefined ? isActive : true,
        normalBalance
      });

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: account
      });
    } catch (error) {
      console.error('Error creating account:', error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Update account
  static async updateAccount(req, res) {
    try {
      const { id } = req.params;
      const {
        accountCode,
        accountName,
        accountType,
        accountCategory,
        parentAccountId,
        isActive,
        normalBalance
      } = req.body;

      const account = await Chart_of_accounts.findByPk(id);
      
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found'
        });
      }

      // Check if new account code already exists (if changing)
      if (accountCode && accountCode !== account.accountCode) {
        const existingAccount = await Chart_of_accounts.findOne({
          where: { 
            accountCode,
            id: { [Op.ne]: id }
          }
        });

        if (existingAccount) {
          return res.status(400).json({
            success: false,
            message: 'Account code already exists'
          });
        }
      }

      // Validate parent account if provided
      if (parentAccountId && parentAccountId !== account.parentAccountId) {
        const parentAccount = await Chart_of_accounts.findByPk(parentAccountId);
        if (!parentAccount) {
          return res.status(400).json({
            success: false,
            message: 'Parent account not found'
          });
        }

        // Prevent circular reference
        if (parentAccountId === id) {
          return res.status(400).json({
            success: false,
            message: 'Account cannot be its own parent'
          });
        }
      }

      const updateData = {};
      if (accountCode !== undefined) updateData.accountCode = accountCode;
      if (accountName !== undefined) updateData.accountName = accountName;
      if (accountType !== undefined) updateData.accountType = accountType;
      if (accountCategory !== undefined) updateData.accountCategory = accountCategory;
      if (parentAccountId !== undefined) updateData.parentAccountId = parentAccountId;
      if (isActive !== undefined) updateData.isActive = isActive;
      if (normalBalance !== undefined) updateData.normalBalance = normalBalance;

      await account.update(updateData);

      // Reload with associations
      await account.reload({
        include: [
          {
            model: Chart_of_accounts,
            as: 'parentAccount',
            attributes: ['id', 'accountCode', 'accountName']
          },
          {
            model: Chart_of_accounts,
            as: 'childAccounts',
            attributes: ['id', 'accountCode', 'accountName', 'accountType']
          }
        ]
      });

      res.status(200).json({
        success: true,
        message: 'Account updated successfully',
        data: account
      });
    } catch (error) {
      console.error('Error updating account:', error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Delete account (soft delete by setting isActive to false)
  static async deleteAccount(req, res) {
    try {
      const { id } = req.params;
      
      const account = await Chart_of_accounts.findByPk(id);
      
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found'
        });
      }

      // Check if account has child accounts
      const childAccounts = await Chart_of_accounts.findAll({
        where: { parentAccountId: id }
      });

      if (childAccounts.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete account with child accounts'
        });
      }

      // Check if account has transactions (journal entries)
      // This would require checking journal_entry_details table
      // For now, we'll just deactivate the account
      
      await account.update({ isActive: false });

      res.status(200).json({
        success: true,
        message: 'Account deactivated successfully',
        data: account
      });
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get accounts by type
  static async getAccountsByType(req, res) {
    try {
      const { accountType } = req.params;
      
      if (!['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'].includes(accountType)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid account type'
        });
      }

      const accounts = await Chart_of_accounts.findAll({
        where: {
          accountType: accountType,
          isActive: true
        },
        order: [['accountCode', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: `${accountType} accounts retrieved successfully`,
        data: accounts
      });
    } catch (error) {
      console.error('Error getting accounts by type:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get account hierarchy
  static async getAccountHierarchy(req, res) {
    try {
      const accounts = await Chart_of_accounts.findAll({
        where: { isActive: true },
        include: [
          {
            model: Chart_of_accounts,
            as: 'childAccounts',
            include: [
              {
                model: Chart_of_accounts,
                as: 'childAccounts'
              }
            ]
          }
        ],
        order: [
          ['accountCode', 'ASC'],
          [{ model: Chart_of_accounts, as: 'childAccounts' }, 'accountCode', 'ASC']
        ]
      });

      // Filter only parent accounts (those without parentAccountId)
      const hierarchy = accounts.filter(account => !account.parentAccountId);

      res.status(200).json({
        success: true,
        message: 'Account hierarchy retrieved successfully',
        data: hierarchy
      });
    } catch (error) {
      console.error('Error getting account hierarchy:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

module.exports = ChartOfAccountsController;
