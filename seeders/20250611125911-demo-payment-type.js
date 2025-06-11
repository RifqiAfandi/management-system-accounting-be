'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payment_types', [{
      paymentName: 'Cash',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      paymentName: 'QRIS',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payment_types', null, {});
  }
};
