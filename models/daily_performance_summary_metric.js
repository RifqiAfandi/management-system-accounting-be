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
      // Define associations
      Daily_performance_summary_metric.hasMany(models.Daily_performance_summary, {
        foreignKey: 'dailyPerformanceSummaryMetricId',
        as: 'summaries'
      });
    }
  }
  Daily_performance_summary_metric.init({
    metricName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Daily_performance_summary_metric',
    tableName: 'Daily_performance_summary_metrics',
  });
  return Daily_performance_summary_metric;
};