'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daily_performance_summary_target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      Daily_performance_summary_target.hasMany(models.Daily_performance_summary, {
        foreignKey: 'dailyPerformanceSummaryTargetId',
        as: 'summaries'
      });
    }
  }
  Daily_performance_summary_target.init({
    dailyTargetValue: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Daily_performance_summary_target',
    tableName: 'Daily_performance_summary_targets',
  });
  return Daily_performance_summary_target;
};