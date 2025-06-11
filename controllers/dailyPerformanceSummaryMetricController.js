const { Daily_performance_summary_metric } = require("../models");

async function getAllDailyPerformanceSummaryMetrics(req, res) {
  try {
    const dailyPerformanceSummaryMetrics = await Daily_performance_summary_metric.findAll();
    if (dailyPerformanceSummaryMetrics.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No daily performance summary metrics found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Daily performance summary metrics retrieved successfully",
      isSuccess: true,
      data: dailyPerformanceSummaryMetrics,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = {
  getAllDailyPerformanceSummaryMetrics,
};
