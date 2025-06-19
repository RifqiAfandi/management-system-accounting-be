'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('General_ledger', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Chart_of_accounts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      journalEntryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Journal_entries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      journalEntryDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Journal_entry_details',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      debitAmount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      creditAmount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      runningBalance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add indexes for performance
    await queryInterface.addIndex('General_ledger', ['transactionDate']);
    await queryInterface.addIndex('General_ledger', ['accountId']);
    await queryInterface.addIndex('General_ledger', ['journalEntryId']);
    await queryInterface.addIndex('General_ledger', ['accountId', 'transactionDate']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('General_ledger');
  }
};
