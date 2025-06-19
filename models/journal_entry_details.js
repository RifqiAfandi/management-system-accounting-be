'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Journal_entry_details extends Model {
    static associate(models) {
      Journal_entry_details.belongsTo(models.Journal_entries, {
        foreignKey: 'journalEntryId',
        as: 'journalEntry'
      });

      Journal_entry_details.belongsTo(models.Chart_of_accounts, {
        foreignKey: 'accountId',
        as: 'account'
      });

      Journal_entry_details.hasOne(models.General_ledger, {
        foreignKey: 'journalEntryDetailId',
        as: 'generalLedgerEntry'
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
  }

  Journal_entry_details.init({
    journalEntryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500]
      }
    }
  }, {
    sequelize,
    modelName: 'Journal_entry_details',
    tableName: 'Journal_entry_details',
    validate: {
      // Custom validation to ensure either debit or credit is entered, but not both
      eitherDebitOrCredit() {
        const debit = parseFloat(this.debitAmount) || 0;
        const credit = parseFloat(this.creditAmount) || 0;
        
        if (debit > 0 && credit > 0) {
          throw new Error('Cannot have both debit and credit amounts in the same entry');
        }
        
        if (debit === 0 && credit === 0) {
          throw new Error('Must have either debit or credit amount');
        }
      }
    },
    hooks: {
      afterCreate: async (detail, options) => {
        // Update journal entry totals
        const journalEntry = await detail.getJournalEntry();
        if (journalEntry) {
          await journalEntry.reload({
            include: [{
              model: sequelize.models.Journal_entry_details,
              as: 'details'
            }]
          });
          
          const totalDebit = journalEntry.details.reduce((sum, d) => sum + parseFloat(d.debitAmount || 0), 0);
          const totalCredit = journalEntry.details.reduce((sum, d) => sum + parseFloat(d.creditAmount || 0), 0);
          
          await journalEntry.update({
            totalDebit: totalDebit,
            totalCredit: totalCredit
          });
        }
      },
      
      afterUpdate: async (detail, options) => {
        // Update journal entry totals
        const journalEntry = await detail.getJournalEntry();
        if (journalEntry) {
          await journalEntry.reload({
            include: [{
              model: sequelize.models.Journal_entry_details,
              as: 'details'
            }]
          });
          
          const totalDebit = journalEntry.details.reduce((sum, d) => sum + parseFloat(d.debitAmount || 0), 0);
          const totalCredit = journalEntry.details.reduce((sum, d) => sum + parseFloat(d.creditAmount || 0), 0);
          
          await journalEntry.update({
            totalDebit: totalDebit,
            totalCredit: totalCredit
          });
        }
      }
    }
  });

  return Journal_entry_details;
};
