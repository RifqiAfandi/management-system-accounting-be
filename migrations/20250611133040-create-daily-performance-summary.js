'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Daily_performance_summaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dailyPerformanceSummaryMetricId: {
        type: Sequelize.INTEGER
      },
      dailyPerformanceSummaryTargetId: {
        type: Sequelize.INTEGER
      },
      actual: {
        type: Sequelize.DECIMAL
      },
      achivement: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Daily_performance_summaries');
  }
};