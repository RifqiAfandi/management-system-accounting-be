const { Operational_cost_type } = require("../models");

async function getAllOperationalCostTypes(req, res) {
  try {
    const operationalCostTypes = await Operational_cost_type.findAll({
      order: [['operationalCostName', 'ASC']]
    });
    
    // Transform data to match frontend expectations
    const transformedData = operationalCostTypes.map(type => ({
      id: type.id,
      name: type.operationalCostName,
      description: type.operationalCostName, // Using name as description since there's no description field
      createdAt: type.createdAt,
      updatedAt: type.updatedAt
    }));
    
    res.status(200).json({
      success: true,
      message: "Operational cost types retrieved successfully",
      data: transformedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

module.exports = {
  getAllOperationalCostTypes,
};
