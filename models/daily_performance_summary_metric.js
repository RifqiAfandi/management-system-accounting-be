'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daily_performance_summary_metric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Daily_performance_summary_metric.init({
    metricName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Daily_performance_summary_metric',
  });
  return Daily_performance_summary_metric;
};