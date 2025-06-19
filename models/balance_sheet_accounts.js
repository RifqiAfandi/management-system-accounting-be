'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Balance_sheet_accounts extends Model {
    static associate(models) {
      Balance_sheet_accounts.belongsTo(models.Chart_of_accounts, {
        foreignKey: 'accountId',
        as: 'account'
      });
    }

    // Instance methods
    getCurrentBalance() {
      return parseFloat(this.currentBalance || 0);
    }

    getOpeningBalance() {
      return parseFloat(this.openingBalance || 0);
    }

    getClosingBalance() {
      return parseFloat(this.closingBalance || 0);
    }

    getNetChange() {
      return this.getCurrentBalance() - this.getOpeningBalance();
    }

    // Static methods
    static async updateCurrentBalance(accountId, year, month) {
      const account = await sequelize.models.Chart_of_accounts.findByPk(accountId);
      if (!account) return null;

      // Calculate current balance from general ledger
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0); // Last day of the month

      const currentBalance = await sequelize.models.General_ledger.getAccountBalance(
        accountId, 
        endDate
      );

      // Find or create balance sheet account record
      const [balanceSheetAccount, created] = await Balance_sheet_accounts.findOrCreate({
        where: {
          accountId: accountId,
          periodYear: year,
          periodMonth: month
        },
        defaults: {
          accountId: accountId,
          periodYear: year,
          periodMonth: month,
          openingBalance: 0,
          currentBalance: currentBalance,
          closingBalance: currentBalance
        }
      });

      if (!created) {
        await balanceSheetAccount.update({
          currentBalance: currentBalance,
          closingBalance: currentBalance
        });
      }

      return balanceSheetAccount;
    }

    static async generateBalanceSheet(year, month) {
      const accounts = await sequelize.models.Chart_of_accounts.findAll({
        where: {
          isActive: true,
          accountType: ['ASSET', 'LIABILITY', 'EQUITY']
        },
        include: [{
          model: Balance_sheet_accounts,
          as: 'balanceSheetAccounts',
          where: {
            periodYear: year,
            periodMonth: month
          },
          required: false
        }],
        order: [['accountCode', 'ASC']]
      });

      const balanceSheet = {
        assets: {
          currentAssets: [],
          fixedAssets: [],
          totalCurrentAssets: 0,
          totalFixedAssets: 0,
          totalAssets: 0
        },
        liabilities: {
          currentLiabilities: [],
          longTermLiabilities: [],
          totalCurrentLiabilities: 0,
          totalLongTermLiabilities: 0,
          totalLiabilities: 0
        },
        equity: {
          capital: [],
          retainedEarnings: [],
          totalCapital: 0,
          totalRetainedEarnings: 0,
          totalEquity: 0
        },
        totalLiabilitiesAndEquity: 0,
        isBalanced: false
      };

      for (const account of accounts) {
        const balanceSheetAccount = account.balanceSheetAccounts?.[0];
        const balance = balanceSheetAccount ? balanceSheetAccount.getCurrentBalance() : 0;

        if (balance === 0) continue;

        const accountData = {
          accountCode: account.accountCode,
          accountName: account.accountName,
          balance: Math.abs(balance)
        };

        // Categorize accounts
        if (account.accountType === 'ASSET') {
          if (account.accountCategory === 'CURRENT_ASSET') {
            balanceSheet.assets.currentAssets.push(accountData);
            balanceSheet.assets.totalCurrentAssets += accountData.balance;
          } else if (account.accountCategory === 'FIXED_ASSET') {
            balanceSheet.assets.fixedAssets.push(accountData);
            balanceSheet.assets.totalFixedAssets += accountData.balance;
          }
          balanceSheet.assets.totalAssets += accountData.balance;
        } else if (account.accountType === 'LIABILITY') {
          if (account.accountCategory === 'CURRENT_LIABILITY') {
            balanceSheet.liabilities.currentLiabilities.push(accountData);
            balanceSheet.liabilities.totalCurrentLiabilities += accountData.balance;
          } else if (account.accountCategory === 'LONG_TERM_LIABILITY') {
            balanceSheet.liabilities.longTermLiabilities.push(accountData);
            balanceSheet.liabilities.totalLongTermLiabilities += accountData.balance;
          }
          balanceSheet.liabilities.totalLiabilities += accountData.balance;
        } else if (account.accountType === 'EQUITY') {
          if (account.accountCategory === 'CAPITAL') {
            balanceSheet.equity.capital.push(accountData);
            balanceSheet.equity.totalCapital += accountData.balance;
          } else if (account.accountCategory === 'RETAINED_EARNINGS') {
            balanceSheet.equity.retainedEarnings.push(accountData);
            balanceSheet.equity.totalRetainedEarnings += accountData.balance;
          }
          balanceSheet.equity.totalEquity += accountData.balance;
        }
      }

      balanceSheet.totalLiabilitiesAndEquity = 
        balanceSheet.liabilities.totalLiabilities + balanceSheet.equity.totalEquity;
      
      balanceSheet.isBalanced = 
        Math.abs(balanceSheet.assets.totalAssets - balanceSheet.totalLiabilitiesAndEquity) < 0.01;

      return balanceSheet;
    }
  }

  Balance_sheet_accounts.init({
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    periodYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2020,
        max: 2050
      }
    },
    periodMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12
      }
    },
    openingBalance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    currentBalance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    closingBalance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Balance_sheet_accounts',
    tableName: 'Balance_sheet_accounts'
  });

  return Balance_sheet_accounts;
};
