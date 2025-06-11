'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Daily_performance_summary_metrics', [
      {
        metricName: 'Revenue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        metricName: 'Customer Traffic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        metricName: 'Average Transaction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        metricName: 'Profit Margin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Daily_performance_summary_metrics', null, {});
  }
};
