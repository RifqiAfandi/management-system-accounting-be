'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await queryInterface.bulkInsert('Daily_operational_costs', [
      {
        operationalCostTypeId: 1,
        amount: 350000,
        description: 'Gaji harian 5 karyawan',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 2,
        amount: 85000,
        description: 'Tagihan listrik dan air harian',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 3,
        amount: 125000,
        description: 'Kemasan takeaway dan packaging',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 4,
        amount: 45000,
        description: 'Perawatan mesin kopi dan peralatan',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 5,
        amount: 280000,
        description: 'Pembelian bahan baku makanan dan minuman',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 6,
        amount: 35000,
        description: 'Gas LPG untuk dapur',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 7,
        amount: 65000,
        description: 'Ongkos delivery dan transportasi',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 8,
        amount: 25000,
        description: 'Peralatan kecil dan supplies',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 9,
        amount: 40000,
        description: 'Sabun, tissue, dan perlengkapan kebersihan',
        createdAt: today,
        updatedAt: today
      },
      {
        operationalCostTypeId: 1,
        amount: 350000,
        description: 'Gaji harian 5 karyawan',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 2,
        amount: 78000,
        description: 'Tagihan listrik dan air harian',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 3,
        amount: 110000,
        description: 'Kemasan takeaway dan packaging',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 4,
        amount: 0,
        description: 'Tidak ada maintenance',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 5,
        amount: 265000,
        description: 'Pembelian bahan baku makanan dan minuman',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 6,
        amount: 30000,
        description: 'Gas LPG untuk dapur',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 7,
        amount: 58000,
        description: 'Ongkos delivery dan transportasi',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 8,
        amount: 15000,
        description: 'Peralatan kecil dan supplies',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 9,
        amount: 35000,
        description: 'Sabun, tissue, dan perlengkapan kebersihan',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationalCostTypeId: 1,
        amount: 350000,
        description: 'Gaji harian 5 karyawan',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 2,
        amount: 82000,
        description: 'Tagihan listrik dan air harian',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 3,
        amount: 118000,
        description: 'Kemasan takeaway dan packaging',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 4,
        amount: 120000,
        description: 'Service mesin espresso',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 5,
        amount: 275000,
        description: 'Pembelian bahan baku makanan dan minuman',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 6,
        amount: 50000,
        description: 'Beli tabung gas baru',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 7,
        amount: 72000,
        description: 'Ongkos delivery dan transportasi',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 8,
        amount: 85000,
        description: 'Beli blender baru',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationalCostTypeId: 9,
        amount: 45000,
        description: 'Sabun, tissue, dan perlengkapan kebersihan',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Daily_operational_costs', null, {});
  }
};
