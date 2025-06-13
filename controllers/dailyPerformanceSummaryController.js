const { Daily_performance_summary, Daily_performance_summary_metric, Daily_performance_summary_target } = require("../models");
const { Op } = require("sequelize");

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
    });    if (dailyPerformanceSummaries.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No daily performance summaries found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Daily performance summaries retrieved successfully",
      success: true,
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

    if (!dailyPerformanceSummary) {      return res.status(404).json({
        status: "error",
        message: "Daily performance summary not found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Daily performance summary retrieved successfully",
      success: true,
      data: dailyPerformanceSummary,
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

// Create new daily performance summary
async function createDailyPerformanceSummary(req, res) {
  try {
    const { dailyPerformanceSummaryMetricId, dailyPerformanceSummaryTargetId, actual, achivement, status } = req.body;    // Validate required fields
    if (!dailyPerformanceSummaryMetricId || !dailyPerformanceSummaryTargetId || actual === undefined) {
      return res.status(400).json({
        status: "error",
        message: "dailyPerformanceSummaryMetricId, dailyPerformanceSummaryTargetId, and actual are required",
        success: false,
        data: null,
      });
    }

    // Check if metric exists
    const metric = await Daily_performance_summary_metric.findByPk(dailyPerformanceSummaryMetricId);
    if (!metric) {
      return res.status(400).json({
        status: "error",
        message: "Daily performance summary metric not found",
        success: false,
        data: null,
      });
    }

    // Check if target exists
    const target = await Daily_performance_summary_target.findByPk(dailyPerformanceSummaryTargetId);
    if (!target) {
      return res.status(400).json({
        status: "error",
        message: "Daily performance summary target not found",
        success: false,
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
    });    res.status(201).json({
      status: "success",
      message: "Daily performance summary created successfully",
      success: true,
      data: createdSummary,
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

// Update daily performance summary
async function updateDailyPerformanceSummary(req, res) {
  try {
    const { id } = req.params;
    const { dailyPerformanceSummaryMetricId, dailyPerformanceSummaryTargetId, actual, achivement, status } = req.body;    // Check if summary exists
    const existingSummary = await Daily_performance_summary.findByPk(id);
    if (!existingSummary) {
      return res.status(404).json({
        status: "error",
        message: "Daily performance summary not found",
        success: false,
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
          success: false,
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
          success: false,
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
    });    res.status(200).json({
      status: "success",
      message: "Daily performance summary updated successfully",
      success: true,
      data: updatedSummary,
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

// Delete daily performance summary
async function deleteDailyPerformanceSummary(req, res) {
  try {
    const { id } = req.params;    const existingSummary = await Daily_performance_summary.findByPk(id);
    if (!existingSummary) {
      return res.status(404).json({
        status: "error",
        message: "Daily performance summary not found",
        success: false,
        data: null,
      });
    }

    await existingSummary.destroy();

    res.status(200).json({
      status: "success",
      message: "Daily performance summary deleted successfully",
      success: true,
      data: null,
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
  getAllDailyPerformanceSummaries,
  getDailyPerformanceSummaryById,
  createDailyPerformanceSummary,
  updateDailyPerformanceSummary,
  deleteDailyPerformanceSummary,
  getDailyPerformanceSummaryByDate,
  getAvailableDates,
};

// Get daily performance summary by date
async function getDailyPerformanceSummaryByDate(req, res) {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date parameter is required",
      });
    }

    // Parse the date and create start/end of day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const performanceSummaryData = await Daily_performance_summary.findAll({
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
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    // Transform the data to match frontend expectations
    const transformedData = performanceSummaryData.map((item) => ({
      id: item.id,
      dailyPerformanceSummaryMetricId: item.dailyPerformanceSummaryMetricId,
      dailyPerformanceSummaryTargetId: item.dailyPerformanceSummaryTargetId,
      actual: parseFloat(item.actual) || 0,
      achivement: parseFloat(item.achivement) || 0,
      status: item.status || "",
      date: item.createdAt.toISOString().split("T")[0],
      createdAt: item.createdAt,
      metric: {
        id: item.metric ? item.metric.id : null,
        metricName: item.metric ? item.metric.metricName : "Unknown",
      },
      target: {
        id: item.target ? item.target.id : null,
        dailyTargetValue: item.target ? parseFloat(item.target.dailyTargetValue) : 0,
      },
    }));

    res.status(200).json({
      success: true,
      message: "Daily performance summary data retrieved successfully",
      data: transformedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// Get available dates
async function getAvailableDates(req, res) {
  try {
    const dates = await Daily_performance_summary.findAll({
      attributes: [
        [Daily_performance_summary.sequelize.fn("DATE", Daily_performance_summary.sequelize.col("createdAt")), "date"],
      ],
      group: [Daily_performance_summary.sequelize.fn("DATE", Daily_performance_summary.sequelize.col("createdAt"))],
      order: [[Daily_performance_summary.sequelize.fn("DATE", Daily_performance_summary.sequelize.col("createdAt")), "DESC"]],
    });

    const dateList = dates.map((item) => item.dataValues.date);

    res.status(200).json({
      success: true,
      message: "Available dates retrieved successfully",
      data: dateList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
