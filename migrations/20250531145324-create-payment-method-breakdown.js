"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payment_method_breakdowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      inputDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      paymentTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Payment_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      jumlahTransaksi: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      persenDariTotal: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      revenue: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      fee: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payment_method_breakdowns");
  },
};
