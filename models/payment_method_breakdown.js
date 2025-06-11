"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_method_breakdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */    static associate(models) {
      Payment_method_breakdown.belongsTo(models.Payment_type, {
        foreignKey: "paymentTypeId",
        as: "paymentType",
      });
    }
  }  Payment_method_breakdown.init(
    {
      paymentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Payment_types",
          key: "id",
        },
      },
      jumlahTransaksi: DataTypes.DECIMAL,
      persenDariTotal: DataTypes.DECIMAL,
      revenue: DataTypes.DECIMAL,
      fee: DataTypes.DECIMAL,
    },{
      sequelize,
      modelName: "Payment_method_breakdown",
      tableName: "Payment_method_breakdowns",
    }
  );
  return Payment_method_breakdown;
};
