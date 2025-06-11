"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sales_by_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sales_by_category.belongsTo(models.Sales_category, {
        foreignKey: "salesCategoryId",
        as: "category",
      });
    }
  }
  Sales_by_category.init(
    {
      salesCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Sales_categories",
          key: "id",
        },
      },
      qtyTerjual: DataTypes.DECIMAL,
      revenue: DataTypes.DECIMAL,
      hpp: DataTypes.DECIMAL,
      margin: DataTypes.DECIMAL,
    },    {
      sequelize,
      modelName: "Sales_by_category",
      tableName: "Sales_by_categories",
    }
  );
  return Sales_by_category;
};
