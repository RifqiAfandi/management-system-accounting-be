"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Daily_operational_cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */    static associate(models) {
      Daily_operational_cost.belongsTo(models.Operational_cost_type, {
        foreignKey: "operationalCostTypeId",
        as: "operationalCostType",
      });
    }
  }  Daily_operational_cost.init(
    {
      operationalCostTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Operational_cost_types",
          key: "id",
        },
      },
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
    },{
      sequelize,
      modelName: "Daily_operational_cost",
      tableName: "Daily_operational_costs",
    }
  );
  return Daily_operational_cost;
};
