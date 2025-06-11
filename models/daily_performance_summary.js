'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daily_performance_summary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Daily_performance_summary.init({
    dailyPerformanceSummaryMetricId: DataTypes.INTEGER,
    dailyPerformanceSummaryTargetId: DataTypes.INTEGER,
    actual: DataTypes.DECIMAL,
    achivement: DataTypes.DECIMAL,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Daily_performance_summary',
  });
  return Daily_performance_summary;
};