const { Operational_cost_type } = require("../models");

async function getAllOperationalCostTypes(req, res) {
  try {
    const operationalCostTypes = await Operational_cost_type.findAll();
    if (operationalCostTypes.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No operational cost types found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Operational cost types retrieved successfully",
      isSuccess: true,
      data: operationalCostTypes,
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
  getAllOperationalCostTypes,
};
