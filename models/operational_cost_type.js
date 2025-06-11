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
     */    static associate(models) {
      // Define associations
      Operational_cost_type.hasMany(models.Daily_operational_cost, {
        foreignKey: 'operationalCostTypeId',
        as: 'operationalCosts'
      });
    }
  }
  Operational_cost_type.init({
    operationalCostName: DataTypes.STRING  }, {
    sequelize,
    modelName: 'Operational_cost_type',
    tableName: 'Operational_cost_types',
  });
  return Operational_cost_type;
};