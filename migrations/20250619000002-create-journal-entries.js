'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Journal_entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      journalNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      journalDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      totalDebit: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      totalCredit: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('DRAFT', 'POSTED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'DRAFT'
      },
      referenceType: {
        type: Sequelize.ENUM('SALES', 'OPERATIONAL_COST', 'PAYMENT', 'ADJUSTMENT', 'OPENING_BALANCE'),
        allowNull: true
      },
      referenceId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

    // Add indexes
    await queryInterface.addIndex('Journal_entries', ['journalDate']);
    await queryInterface.addIndex('Journal_entries', ['status']);
    await queryInterface.addIndex('Journal_entries', ['referenceType', 'referenceId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Journal_entries');
  }
};
