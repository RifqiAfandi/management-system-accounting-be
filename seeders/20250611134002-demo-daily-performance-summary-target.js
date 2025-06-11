'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Daily_performance_summary_targets', [
      {
        dailyTargetValue: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dailyTargetValue: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dailyTargetValue: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dailyTargetValue: 20.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Daily_performance_summary_targets', null, {});
  }
};
