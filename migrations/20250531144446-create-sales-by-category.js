'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales_by_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inputDate: {
        type: Sequelize.DATE
      },
      salesCategoryId: {
        type: Sequelize.INTEGER
      },
      qtyTerjual: {
        type: Sequelize.DECIMAL
      },
      revenue: {
        type: Sequelize.DECIMAL
      },
      hpp: {
        type: Sequelize.DECIMAL
      },
      margin: {
        type: Sequelize.DECIMAL
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales_by_categories');
  }
};