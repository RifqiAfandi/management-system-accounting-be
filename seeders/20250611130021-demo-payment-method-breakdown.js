'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await queryInterface.bulkInsert('Payment_method_breakdowns', [
      {
        paymentTypeId: 1,
        jumlahTransaksi: 65,
        persenDariTotal: 60.75,
        revenue: 1230000,
        fee: 0,
        createdAt: today,
        updatedAt: today
      },
      {
        paymentTypeId: 2,
        jumlahTransaksi: 42,
        persenDariTotal: 39.25,
        revenue: 820000,
        fee: 8200,
        createdAt: today,
        updatedAt: today
      },
      {
        paymentTypeId: 1,
        jumlahTransaksi: 58,
        persenDariTotal: 65.91,
        revenue: 1100000,
        fee: 0,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        paymentTypeId: 2,
        jumlahTransaksi: 30,
        persenDariTotal: 34.09,
        revenue: 720000,
        fee: 7200,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        paymentTypeId: 1,
        jumlahTransaksi: 62,
        persenDariTotal: 63.27,
        revenue: 1180000,
        fee: 0,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        paymentTypeId: 2,
        jumlahTransaksi: 36,
        persenDariTotal: 36.73,
        revenue: 875000,
        fee: 8750,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payment_method_breakdowns', null, {});
  }
};
