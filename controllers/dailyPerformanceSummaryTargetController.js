const { Daily_performance_summary_target } = require("../models");

async function getAllDailyPerformanceSummaryTargets(req, res) {
  try {
    const dailyPerformanceSummaryTargets = await Daily_performance_summary_target.findAll();
    if (dailyPerformanceSummaryTargets.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No daily performance summary targets found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Daily performance summary targets retrieved successfully",
      success: true,
      data: dailyPerformanceSummaryTargets,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      success: false,
      data: null,
    });
  }
}

module.exports = {
  getAllDailyPerformanceSummaryTargets,
};
