'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Journal_entries extends Model {
    static associate(models) {
      Journal_entries.hasMany(models.Journal_entry_details, {
        foreignKey: 'journalEntryId',
        as: 'details'
      });

      Journal_entries.hasMany(models.General_ledger, {
        foreignKey: 'journalEntryId',
        as: 'generalLedgerEntries'
      });

      Journal_entries.belongsTo(models.Users, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
    }

    // Instance methods
    isBalanced() {
      return parseFloat(this.totalDebit) === parseFloat(this.totalCredit);
    }

    isDraft() {
      return this.status === 'DRAFT';
    }

    isPosted() {
      return this.status === 'POSTED';
    }

    isCancelled() {
      return this.status === 'CANCELLED';
    }

    canBeEdited() {
      return this.status === 'DRAFT';
    }

    canBePosted() {
      return this.status === 'DRAFT' && this.isBalanced();
    }

    // Static methods
    static async generateJournalNumber(date) {
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
      const count = await Journal_entries.count({
        where: {
          journalDate: date
        }
      });
      return `JE${dateStr}${String(count + 1).padStart(3, '0')}`;
    }
  }

  Journal_entries.init({
    journalNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    journalDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 1000]
      }
    },
    totalDebit: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    totalCredit: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('DRAFT', 'POSTED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'DRAFT',
      validate: {
        isIn: [['DRAFT', 'POSTED', 'CANCELLED']]
      }
    },
    referenceType: {
      type: DataTypes.ENUM('SALES', 'OPERATIONAL_COST', 'PAYMENT', 'ADJUSTMENT', 'OPENING_BALANCE'),
      allowNull: true
    },
    referenceId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Journal_entries',
    tableName: 'Journal_entries',
    validate: {
      // Custom validation to ensure debits equal credits for posted entries
      debitsEqualCredits() {
        if (this.status === 'POSTED' && parseFloat(this.totalDebit) !== parseFloat(this.totalCredit)) {
          throw new Error('Total debits must equal total credits for posted journal entries');
        }
      }
    },
    hooks: {
      beforeCreate: async (journalEntry, options) => {
        if (!journalEntry.journalNumber) {
          journalEntry.journalNumber = await Journal_entries.generateJournalNumber(new Date(journalEntry.journalDate));
        }
      }
    }
  });

  return Journal_entries;
};
