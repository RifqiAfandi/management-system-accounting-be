'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payment_method_breakdowns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentTypeId: {
        type: Sequelize.INTEGER
      },
      jumlahTransaksi: {
        type: Sequelize.DECIMAL
      },
      persenDariTotal: {
        type: Sequelize.DECIMAL
      },
      revenue: {
        type: Sequelize.DECIMAL
      },
      fee: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payment_method_breakdowns');
  }
};