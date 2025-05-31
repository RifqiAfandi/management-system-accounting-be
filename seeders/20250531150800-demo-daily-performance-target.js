'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Daily_performance_targets', [
      {
        revenue: 300000,
        customerTraffic: 25,
        avgTransaction: 5000,
        profitMargin: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Daily_performance_targets', null, {});
  }
};
