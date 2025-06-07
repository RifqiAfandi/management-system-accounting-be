const { Payment_type } = require("../models");

async function getAllPaymentTypes(req, res) {
  try {
    const paymentTypes = await Payment_type.findAll();
    if (paymentTypes.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No payment types found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Payment types retrieved successfully",
      isSuccess: true,
      data: paymentTypes,
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
  getAllPaymentTypes,
};
