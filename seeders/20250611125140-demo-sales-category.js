'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sales_categories', [
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
    await queryInterface.bulkDelete('Sales_categories', null, {});
  }
};
