const { Daily_operational_cost } = require("../models");
const {Operational_cost_type} = require("../models");

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
      whereClause.inputDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      whereClause.inputDate = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      whereClause.inputDate = {
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
      order: [["inputDate", "DESC"]],
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

module.exports = {
    createDailyOperationalCost,
    updateDailyOperationalCost,
    deleteDailyOperationalCost,
    getAllDailyOperationalCost,
};
