'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Balance_sheet_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Chart_of_accounts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      periodYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      periodMonth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      openingBalance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      currentBalance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      closingBalance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
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

    // Add composite unique index to prevent duplicate period entries
    await queryInterface.addIndex('Balance_sheet_accounts', 
      ['accountId', 'periodYear', 'periodMonth'], 
      { unique: true, name: 'unique_account_period' }
    );
    
    // Add indexes for performance
    await queryInterface.addIndex('Balance_sheet_accounts', ['periodYear', 'periodMonth']);
    await queryInterface.addIndex('Balance_sheet_accounts', ['accountId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Balance_sheet_accounts');
  }
};
