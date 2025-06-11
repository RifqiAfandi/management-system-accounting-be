const { Daily_performance_summary, Daily_performance_summary_metric, Daily_performance_summary_target } = require("../models");

// Get all daily performance summaries
async function getAllDailyPerformanceSummaries(req, res) {
  try {
    const dailyPerformanceSummaries = await Daily_performance_summary.findAll({
      include: [
        {
          model: Daily_performance_summary_metric,
          as: 'metric',
          attributes: ['id', 'metricName']
        },
        {
          model: Daily_performance_summary_target,
          as: 'target',
          attributes: ['id', 'dailyTargetValue']
        }
      ]
    });

    if (dailyPerformanceSummaries.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No daily performance summaries found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Daily performance summaries retrieved successfully",
      isSuccess: true,
      data: dailyPerformanceSummaries,
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

// Get daily performance summary by ID
async function getDailyPerformanceSummaryById(req, res) {
  try {
    const { id } = req.params;
    const dailyPerformanceSummary = await Daily_performance_summary.findByPk(id, {
      include: [
        {
          model: Daily_performance_summary_metric,
          as: 'metric',
          attributes: ['id', 'metricName']
        },
        {
          model: Daily_performance_summary_target,
          as: 'target',
          attributes: ['id', 'dailyTargetValue']
        }
      ]
    });

    if (!dailyPerformanceSummary) {
      return res.status(404).json({
        status: "error",
        message: "Daily performance summary not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Daily performance summary retrieved successfully",
      isSuccess: true,
      data: dailyPerformanceSummary,
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

// Create new daily performance summary
async function createDailyPerformanceSummary(req, res) {
  try {
    const { dailyPerformanceSummaryMetricId, dailyPerformanceSummaryTargetId, actual, achivement, status } = req.body;

    // Validate required fields
    if (!dailyPerformanceSummaryMetricId || !dailyPerformanceSummaryTargetId || actual === undefined) {
      return res.status(400).json({
        status: "error",
        message: "dailyPerformanceSummaryMetricId, dailyPerformanceSummaryTargetId, and actual are required",
        isSuccess: false,
        data: null,
      });
    }

    // Check if metric exists
    const metric = await Daily_performance_summary_metric.findByPk(dailyPerformanceSummaryMetricId);
    if (!metric) {
      return res.status(400).json({
        status: "error",
        message: "Daily performance summary metric not found",
        isSuccess: false,
        data: null,
      });
    }

    // Check if target exists
    const target = await Daily_performance_summary_target.findByPk(dailyPerformanceSummaryTargetId);
    if (!target) {
      return res.status(400).json({
        status: "error",
        message: "Daily performance summary target not found",
        isSuccess: false,
        data: null,
      });
    }

    const newDailyPerformanceSummary = await Daily_performance_summary.create({
      dailyPerformanceSummaryMetricId,
      dailyPerformanceSummaryTargetId,
      actual,
      achivement,
      status
    });

    // Fetch the created record with associations
    const createdSummary = await Daily_performance_summary.findByPk(newDailyPerformanceSummary.id, {
      include: [
        {
          model: Daily_performance_summary_metric,
          as: 'metric',
          attributes: ['id', 'metricName']
        },
        {
          model: Daily_performance_summary_target,
          as: 'target',
          attributes: ['id', 'dailyTargetValue']
        }
      ]
    });

    res.status(201).json({
      status: "success",
      message: "Daily performance summary created successfully",
      isSuccess: true,
      data: createdSummary,
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

// Update daily performance summary
async function updateDailyPerformanceSummary(req, res) {
  try {
    const { id } = req.params;
    const { dailyPerformanceSummaryMetricId, dailyPerformanceSummaryTargetId, actual, achivement, status } = req.body;

    // Check if summary exists
    const existingSummary = await Daily_performance_summary.findByPk(id);
    if (!existingSummary) {
      return res.status(404).json({
        status: "error",
        message: "Daily performance summary not found",
        isSuccess: false,
        data: null,
      });
    }

    // Validate foreign keys if provided
    if (dailyPerformanceSummaryMetricId) {
      const metric = await Daily_performance_summary_metric.findByPk(dailyPerformanceSummaryMetricId);
      if (!metric) {
        return res.status(400).json({
          status: "error",
          message: "Daily performance summary metric not found",
          isSuccess: false,
          data: null,
        });
      }
    }

    if (dailyPerformanceSummaryTargetId) {
      const target = await Daily_performance_summary_target.findByPk(dailyPerformanceSummaryTargetId);
      if (!target) {
        return res.status(400).json({
          status: "error",
          message: "Daily performance summary target not found",
          isSuccess: false,
          data: null,
        });
      }
    }

    await existingSummary.update({
      dailyPerformanceSummaryMetricId,
      dailyPerformanceSummaryTargetId,
      actual,
      achivement,
      status
    });

    // Fetch the updated record with associations
    const updatedSummary = await Daily_performance_summary.findByPk(id, {
      include: [
        {
          model: Daily_performance_summary_metric,
          as: 'metric',
          attributes: ['id', 'metricName']
        },
        {
          model: Daily_performance_summary_target,
          as: 'target',
          attributes: ['id', 'dailyTargetValue']
        }
      ]
    });

    res.status(200).json({
      status: "success",
      message: "Daily performance summary updated successfully",
      isSuccess: true,
      data: updatedSummary,
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

// Delete daily performance summary
async function deleteDailyPerformanceSummary(req, res) {
  try {
    const { id } = req.params;

    const existingSummary = await Daily_performance_summary.findByPk(id);
    if (!existingSummary) {
      return res.status(404).json({
        status: "error",
        message: "Daily performance summary not found",
        isSuccess: false,
        data: null,
      });
    }

    await existingSummary.destroy();

    res.status(200).json({
      status: "success",
      message: "Daily performance summary deleted successfully",
      isSuccess: true,
      data: null,
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
  getAllDailyPerformanceSummaries,
  getDailyPerformanceSummaryById,
  createDailyPerformanceSummary,
  updateDailyPerformanceSummary,
  deleteDailyPerformanceSummary,
};
