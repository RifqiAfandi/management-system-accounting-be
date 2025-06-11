'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sales_by_category', [
      {
        nameCategory: 'Makanan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      , {
        nameCategory: 'Minuman',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sales_category', null, {});
  }
};
