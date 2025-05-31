'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operational_cost_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Operational_cost_type.init({
    operationalCostName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Operational_cost_type',
  });
  return Operational_cost_type;
};