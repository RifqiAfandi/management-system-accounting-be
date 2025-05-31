'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales_by_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sales_by_category.init({
    inputDate: DataTypes.DATE,
    salesCategoryId: DataTypes.INTEGER,
    qtyTerjual: DataTypes.DECIMAL,
    revenue: DataTypes.DECIMAL,
    hpp: DataTypes.DECIMAL,
    margin: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Sales_by_category',
  });
  return Sales_by_category;
};