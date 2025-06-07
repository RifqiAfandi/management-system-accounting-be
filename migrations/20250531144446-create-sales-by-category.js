"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sales_by_categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      salesCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Sales_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      qtyTerjual: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      revenue: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      hpp: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      margin: {
        type: Sequelize.DECIMAL(5, 2),
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
    await queryInterface.dropTable("Sales_by_categories");
  },
};
