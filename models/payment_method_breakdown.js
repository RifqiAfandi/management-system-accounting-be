"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_method_breakdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment_method_breakdown.belongsTo(models.Payment_method, {
        foreignKey: "paymentMethodId",
        as: "method",
      });
    }
  }
  Payment_method_breakdown.init(
    {
      inputDate: DataTypes.DATE,
      paymentMethodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Payment_methods",
          key: "id",
        },
      },
      amount: DataTypes.DECIMAL,
      transactionCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment_method_breakdown",
    }
  );
  return Payment_method_breakdown;
};
