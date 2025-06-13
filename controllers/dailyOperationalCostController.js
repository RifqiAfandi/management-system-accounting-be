const { Daily_operational_cost } = require("../models");
const { Operational_cost_type } = require("../models");
const { Op } = require("sequelize");

async function createDailyOperationalCost(req, res) {
  try {
    const { operationalCostTypeId, amount, description } = req.body;

    const operationalCostType = await Operational_cost_type.findByPk(operationalCostTypeId);
    if (!operationalCostType) {
      return res.status(400).json({
        status: "error",
        message: "Operational cost type not found",
        isSuccess: false,
        data: null,
      });
    }

    const newDailyOperationalCost = await Daily_operational_cost.create({
      operationalCostTypeId,
      amount,
      description,
    });

    const dailyOperationalCostWithDetails =
      await Daily_operational_cost.findByPk(newDailyOperationalCost.id, {
        include: [
          {
            model: Operational_cost_type,
            as: "operationalCostType",
          },
        ],
      });

    res.status(201).json({
      status: "success",
      message: "Daily operational cost created successfully",
      isSuccess: true,
      data: { newDailyOperationalCost: dailyOperationalCostWithDetails },
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        status: "error",
        message: error.message,
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function updateDailyOperationalCost(req, res) {
  try {
    const { id } = req.params;
    const { operationalCostTypeId, amount, description } = req.body;

    const dailyOperationalCost = await Daily_operational_cost.findByPk(id);
    if (!dailyOperationalCost) {
      return res.status(404).json({
        status: "error",
        message: "Daily operational cost not found",
        isSuccess: false,
        data: null,
      });
    }

    if (
      operationalCostTypeId &&
      operationalCostTypeId !== dailyOperationalCost.operationalCostTypeId
    ) {
      const categoryExists = await Operational_cost_type.findByPk(operationalCostTypeId);
      if (!categoryExists) {
        return res.status(400).json({
          status: "error",
          message: "Operational cost type not found",
          isSuccess: false,
          data: null,
        });
      }
    }

    const updateData = {};

    if (operationalCostTypeId !== undefined)
      updateData.operationalCostTypeId = operationalCostTypeId;
    if (amount !== undefined) updateData.amount = amount;
    if (description !== undefined) updateData.description = description;

    await dailyOperationalCost.update(updateData);

    const updatedDailyOperationalCost =
      await Daily_operational_cost.findByPk(id, {
        include: [
          {
            model: Operational_cost_type,
            as: "operationalCostType",
          },
        ],
      });

    res.status(200).json({
      status: "success",
      message: "Daily operational cost updated successfully",
      isSuccess: true,
      data: { dailyOperationalCost: updatedDailyOperationalCost },
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        status: "error",
        message: error.message,
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function deleteDailyOperationalCost(req, res) {
  try {
    const { id } = req.params;

    const dailyOperationalCost = await Daily_operational_cost.findByPk(id, {
      include: [
        {
          model: Operational_cost_type,
          as: "operationalCostType",
        },
      ],
    });

    if (!dailyOperationalCost) {
      return res.status(404).json({
        status: "error",
        message: "Daily operational cost not found",
        isSuccess: false,
        data: null,
      });
    }

    const deletedData = {
      id: dailyOperationalCost.id,
      operationalCost: dailyOperationalCost.operationalCost
        ? dailyOperationalCost.operationalCost.name
        : null,
      amount: dailyOperationalCost.amount,
      description: dailyOperationalCost.description,
    };

    await dailyOperationalCost.destroy();

    res.status(200).json({
      status: "success",
      message: "Daily operational cost deleted successfully",
      isSuccess: true,
      data: { deletedEntry: deletedData },
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

async function getAllDailyOperationalCost(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      operationalCostTypeId,
      startDate,
      endDate,
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (operationalCostTypeId) {
      whereClause.operationalCostTypeId = operationalCostTypeId;
    }
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      whereClause.createdAt = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      whereClause.createdAt = {
        [Op.lte]: new Date(endDate),
      };
    }

    const { count, rows } = await Daily_operational_cost.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Operational_cost_type,
          as: "operationalCostType",
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      message: "Daily operational cost breakdowns retrieved successfully",
      isSuccess: true,
      data: {
        dailyOperationalCostBreakdowns: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit),
        },
      },
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

async function getDailyOperationalCostByDate(req, res) {
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

    const operationalCostData = await Daily_operational_cost.findAll({
      include: [
        {
          model: Operational_cost_type,
          as: "operationalCostType",
          attributes: ["id", "operationalCostName"],
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    // Transform the data to match frontend expectations
    const transformedData = operationalCostData.map((item) => ({
      id: item.id,
      operationalCostTypeId: item.operationalCostTypeId,
      amount: parseFloat(item.amount) || 0,
      description: item.description || "",
      date: item.createdAt.toISOString().split("T")[0],
      createdAt: item.createdAt,
      OperationalCostType: {
        name: item.operationalCostType ? item.operationalCostType.operationalCostName : "Unknown",
        description: item.description || "",
      },
    }));    res.status(200).json({
      success: true,
      message: "Daily operational cost data retrieved successfully",
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

async function getAvailableDates(req, res) {
  try {
    const dates = await Daily_operational_cost.findAll({
      attributes: [
        [Daily_operational_cost.sequelize.fn("DATE", Daily_operational_cost.sequelize.col("createdAt")), "date"],
      ],
      group: [Daily_operational_cost.sequelize.fn("DATE", Daily_operational_cost.sequelize.col("createdAt"))],
      order: [[Daily_operational_cost.sequelize.fn("DATE", Daily_operational_cost.sequelize.col("createdAt")), "DESC"]],
    });

    const dateList = dates.map((item) => item.dataValues.date);    res.status(200).json({
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

module.exports = {
  createDailyOperationalCost,
  updateDailyOperationalCost,
  deleteDailyOperationalCost,
  getAllDailyOperationalCost,
  getDailyOperationalCostByDate,
  getAvailableDates,
};
