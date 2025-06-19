'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class General_ledger extends Model {
    static associate(models) {
      General_ledger.belongsTo(models.Chart_of_accounts, {
        foreignKey: 'accountId',
        as: 'account'
      });

      General_ledger.belongsTo(models.Journal_entries, {
        foreignKey: 'journalEntryId',
        as: 'journalEntry'
      });

      General_ledger.belongsTo(models.Journal_entry_details, {
        foreignKey: 'journalEntryDetailId',
        as: 'journalEntryDetail'
      });
    }

    // Instance methods
    isDebit() {
      return parseFloat(this.debitAmount) > 0;
    }

    isCredit() {
      return parseFloat(this.creditAmount) > 0;
    }

    getAmount() {
      return this.isDebit() ? parseFloat(this.debitAmount) : parseFloat(this.creditAmount);
    }

    getType() {
      return this.isDebit() ? 'DEBIT' : 'CREDIT';
    }

    // Static methods
    static async calculateRunningBalance(accountId, transactionDate, currentBalance = 0) {
      const account = await sequelize.models.Chart_of_accounts.findByPk(accountId);
      if (!account) return currentBalance;

      // Get all previous entries for this account up to the transaction date
      const previousEntries = await General_ledger.findAll({
        where: {
          accountId: accountId,
          transactionDate: {
            [sequelize.Sequelize.Op.lte]: transactionDate
          }
        },
        order: [['transactionDate', 'ASC'], ['id', 'ASC']]
      });

      let runningBalance = 0;
      
      for (const entry of previousEntries) {
        if (account.hasNormalDebitBalance()) {
          // For debit accounts: Debit increases, Credit decreases
          runningBalance += parseFloat(entry.debitAmount || 0);
          runningBalance -= parseFloat(entry.creditAmount || 0);
        } else {
          // For credit accounts: Credit increases, Debit decreases
          runningBalance += parseFloat(entry.creditAmount || 0);
          runningBalance -= parseFloat(entry.debitAmount || 0);
        }
      }

      return runningBalance;
    }

    static async getAccountBalance(accountId, asOfDate = null) {
      const account = await sequelize.models.Chart_of_accounts.findByPk(accountId);
      if (!account) return 0;

      const whereClause = { accountId: accountId };
      if (asOfDate) {
        whereClause.transactionDate = {
          [sequelize.Sequelize.Op.lte]: asOfDate
        };
      }

      const entries = await General_ledger.findAll({
        where: whereClause,
        attributes: [
          [sequelize.fn('SUM', sequelize.col('debitAmount')), 'totalDebits'],
          [sequelize.fn('SUM', sequelize.col('creditAmount')), 'totalCredits']
        ],
        raw: true
      });

      const totalDebits = parseFloat(entries[0].totalDebits || 0);
      const totalCredits = parseFloat(entries[0].totalCredits || 0);

      if (account.hasNormalDebitBalance()) {
        return totalDebits - totalCredits;
      } else {
        return totalCredits - totalDebits;
      }
    }

    static async getTrialBalance(asOfDate = null) {
      const accounts = await sequelize.models.Chart_of_accounts.findAll({
        where: { isActive: true },
        order: [['accountCode', 'ASC']]
      });

      const trialBalance = [];
      
      for (const account of accounts) {
        const balance = await General_ledger.getAccountBalance(account.id, asOfDate);
        
        if (balance !== 0) {
          trialBalance.push({
            accountCode: account.accountCode,
            accountName: account.accountName,
            accountType: account.accountType,
            normalBalance: account.normalBalance,
            balance: Math.abs(balance),
            debitAmount: account.hasNormalDebitBalance() && balance > 0 ? Math.abs(balance) : 0,
            creditAmount: account.hasNormalCreditBalance() && balance > 0 ? Math.abs(balance) : 0
          });
        }
      }

      return trialBalance;
    }
  }

  General_ledger.init({
    transactionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true
      }
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    journalEntryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    journalEntryDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    debitAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    creditAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    runningBalance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500]
      }
    }
  }, {
    sequelize,
    modelName: 'General_ledger',
    tableName: 'General_ledger',
    hooks: {
      beforeCreate: async (ledgerEntry, options) => {
        // Calculate running balance
        ledgerEntry.runningBalance = await General_ledger.calculateRunningBalance(
          ledgerEntry.accountId,
          ledgerEntry.transactionDate,
          ledgerEntry.isDebit() ? ledgerEntry.debitAmount : -ledgerEntry.creditAmount
        );
      }
    }
  });

  return General_ledger;
};
