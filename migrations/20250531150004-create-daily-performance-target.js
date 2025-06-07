"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Daily_performance_targets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      revenue: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      customerTraffic: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
      },
      avgTransaction: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      profitMargin: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Daily_performance_targets");
  },
};
