"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Daily_operational_cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Daily_operational_cost.belongsTo(models.Operational_category, {
        foreignKey: "operationalCategoryId",
        as: "category",
      });
    }
  }
  Daily_operational_cost.init(
    {
      inputDate: DataTypes.DATE,
      operationalCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Operational_categories",
          key: "id",
        },
      },
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Daily_operational_cost",
    }
  );
  return Daily_operational_cost;
};
