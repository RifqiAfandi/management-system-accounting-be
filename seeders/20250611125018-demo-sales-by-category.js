'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await queryInterface.bulkInsert('Sales_by_categories', [
      {
        salesCategoryId: 1,
        qtyTerjual: 45,
        revenue: 1250000,
        hpp: 750000,
        margin: 40.00,
        createdAt: today,
        updatedAt: today
      },
      {
        salesCategoryId: 2,
        qtyTerjual: 32,
        revenue: 800000,
        hpp: 400000,
        margin: 50.00,
        createdAt: today,
        updatedAt: today
      },
      {
        salesCategoryId: 1,
        qtyTerjual: 38,
        revenue: 1100000,
        hpp: 660000,
        margin: 40.00,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        salesCategoryId: 2,
        qtyTerjual: 28,
        revenue: 720000,
        hpp: 360000,
        margin: 50.00,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        salesCategoryId: 1,
        qtyTerjual: 42,
        revenue: 1180000,
        hpp: 708000,
        margin: 40.00,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        salesCategoryId: 2,
        qtyTerjual: 35,
        revenue: 875000,
        hpp: 437500,
        margin: 50.00,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sales_by_categories', null, {});
  }
};
