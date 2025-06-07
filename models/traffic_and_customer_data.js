'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Traffic_and_customer_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Traffic_and_customer_data.init({
    timeShift: DataTypes.STRING,
    customerCount: DataTypes.DECIMAL,
    transaction: DataTypes.DECIMAL,
    conversionRate: DataTypes.DECIMAL,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Traffic_and_customer_data',
  });
  return Traffic_and_customer_data;
};