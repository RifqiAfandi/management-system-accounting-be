'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */    static associate(models) {
      // Define associations
      Payment_type.hasMany(models.Payment_method_breakdown, {
        foreignKey: 'paymentTypeId',
        as: 'breakdowns'
      });
    }
  }
  Payment_type.init({
    paymentName: DataTypes.STRING  }, {
    sequelize,
    modelName: 'Payment_type',
    tableName: 'Payment_types',
  });
  return Payment_type;
};