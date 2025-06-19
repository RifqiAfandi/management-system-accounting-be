'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chart_of_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      accountName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      accountType: {
        type: Sequelize.ENUM('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'),
        allowNull: false
      },
      accountCategory: {
        type: Sequelize.ENUM(
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
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Chart_of_accounts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      normalBalance: {
        type: Sequelize.ENUM('DEBIT', 'CREDIT'),
        allowNull: false
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

    // Add index for better performance
    await queryInterface.addIndex('Chart_of_accounts', ['accountCode']);
    await queryInterface.addIndex('Chart_of_accounts', ['accountType']);
    await queryInterface.addIndex('Chart_of_accounts', ['accountCategory']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chart_of_accounts');
  }
};
