'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Operational_cost_types', [
      {
        operationalCostName: 'Gaji Harian',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Listrik & Air',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Kemasan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Maintenance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Bahan Baku',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Gas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Transportasi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Peralatan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        operationalCostName: 'Kebersihan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Operational_cost_types', null, {});
  }
};
