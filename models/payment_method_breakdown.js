'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_method_breakdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment_method_breakdown.init({
    paymentTypeId: DataTypes.INTEGER,
    jumlahTransaksi: DataTypes.DECIMAL,
    persenDariTotal: DataTypes.DECIMAL,
    revenue: DataTypes.DECIMAL,
    fee: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Payment_method_breakdown',
  });
  return Payment_method_breakdown;
};