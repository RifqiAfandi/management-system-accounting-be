const { Daily_performance_target } = require("../models");

async function getAllDailyPerformanceTargets(req, res) {
  try {
    const dailyPerformanceTargets = await Daily_performance_target.findAll();
    if (dailyPerformanceTargets.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No daily performance targets found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Daily performance targets retrieved successfully",
      isSuccess: true,
      data: dailyPerformanceTargets,
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
  getAllDailyPerformanceTargets,
};
