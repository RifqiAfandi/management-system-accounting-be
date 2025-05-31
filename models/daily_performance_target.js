'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daily_performance_target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Daily_performance_target.init({
    revenue: DataTypes.DECIMAL,
    customerTraffic: DataTypes.DECIMAL,
    avgTransaction: DataTypes.DECIMAL,
    profitMargin: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Daily_performance_target',
  });
  return Daily_performance_target;
};