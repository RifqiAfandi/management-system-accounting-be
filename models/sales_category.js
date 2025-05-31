'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sales_category.init({
    nameCategory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sales_category',
  });
  return Sales_category;
};