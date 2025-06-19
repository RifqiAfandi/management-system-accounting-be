'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chart_of_accounts extends Model {
    static associate(models) {
      // Self-referencing association for parent accounts
      Chart_of_accounts.belongsTo(models.Chart_of_accounts, {
        foreignKey: 'parentAccountId',
        as: 'parentAccount'
      });
      
      Chart_of_accounts.hasMany(models.Chart_of_accounts, {
        foreignKey: 'parentAccountId',
        as: 'childAccounts'
      });

      // Associations with other models
      Chart_of_accounts.hasMany(models.Journal_entry_details, {
        foreignKey: 'accountId',
        as: 'journalEntryDetails'
      });

      Chart_of_accounts.hasMany(models.General_ledger, {
        foreignKey: 'accountId',
        as: 'generalLedgerEntries'
      });

      Chart_of_accounts.hasMany(models.Balance_sheet_accounts, {
        foreignKey: 'accountId',
        as: 'balanceSheetAccounts'
      });
    }

    // Instance methods
    isAsset() {
      return this.accountType === 'ASSET';
    }

    isLiability() {
      return this.accountType === 'LIABILITY';
    }

    isEquity() {
      return this.accountType === 'EQUITY';
    }

    isRevenue() {
      return this.accountType === 'REVENUE';
    }

    isExpense() {
      return this.accountType === 'EXPENSE';
    }

    hasNormalDebitBalance() {
      return this.normalBalance === 'DEBIT';
    }

    hasNormalCreditBalance() {
      return this.normalBalance === 'CREDIT';
    }
  }

  Chart_of_accounts.init({
    accountCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 10]
      }
    },
    accountName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    accountType: {
      type: DataTypes.ENUM('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'),
      allowNull: false,
      validate: {
        isIn: [['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE']]
      }
    },
    accountCategory: {
      type: DataTypes.ENUM(
        'CURRENT_ASSET', 
        'FIXED_ASSET', 
        'CURRENT_LIABILITY', 
        'LONG_TERM_LIABILITY', 
        'CAPITAL', 
        'RETAINED_EARNINGS',
        'OPERATING_REVENUE',
        'OTHER_REVENUE',
        'COST_OF_GOODS_SOLD',
        'OPERATING_EXPENSE',
        'OTHER_EXPENSE'
      ),
      allowNull: false
    },
    parentAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    normalBalance: {
      type: DataTypes.ENUM('DEBIT', 'CREDIT'),
      allowNull: false,
      validate: {
        isIn: [['DEBIT', 'CREDIT']]
      }
    }
  }, {
    sequelize,
    modelName: 'Chart_of_accounts',
    tableName: 'Chart_of_accounts',
    validate: {
      // Custom validation to ensure normal balance matches account type
      normalBalanceMatchesType() {
        const debitTypes = ['ASSET', 'EXPENSE'];
        const creditTypes = ['LIABILITY', 'EQUITY', 'REVENUE'];
        
        if (debitTypes.includes(this.accountType) && this.normalBalance !== 'DEBIT') {
          throw new Error(`${this.accountType} accounts must have DEBIT normal balance`);
        }
        
        if (creditTypes.includes(this.accountType) && this.normalBalance !== 'CREDIT') {
          throw new Error(`${this.accountType} accounts must have CREDIT normal balance`);
        }
      }
    }
  });

  return Chart_of_accounts;
};
