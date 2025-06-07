const { Payment_method_breakdown } = require("../models");

async function createPaymentMethodBreakdown(req, res) {
  try {
    const { paymentTypeId, jumlahTransaksi, persenDariTotal, revenue, fee } =
      req.body;

    // Validasi apakah paymentTypeId exist
    const paymentTypeExists = await Payment_type.findByPk(paymentTypeId);
    if (!paymentTypeExists) {
      return res.status(400).json({
        status: "error",
        message: "Payment type not found",
        isSuccess: false,
        data: null,
      });
    }

    const newPaymentMethodBreakdown = await Payment_method_breakdown.create({
      paymentTypeId,
      jumlahTransaksi,
      persenDariTotal,
      revenue,
      fee,
    });

    // Include category information in response
    const paymentMethodBreakdownWithDetails =
      await Payment_method_breakdown.findByPk(newPaymentMethodBreakdown.id, {
        include: [
          {
            model: Payment_type,
            as: "paymentType",
          },
        ],
      });

    res.status(201).json({
      status: "success",
      message: "Payment method breakdown created successfully",
      isSuccess: true,
      data: { newPaymentMethodBreakdown: paymentMethodBreakdownWithDetails },
    });
  } catch (error) {
    // Handle Sequelize validation errors
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

async function updatePaymentMethodBreakdown(req, res) {
  try {
    const { id } = req.params;
    const { paymentTypeId, jumlahTransaksi, persenDariTotal, revenue, fee } =
      req.body;

    const paymentMethodBreakdown = await Payment_method_breakdown.findByPk(id);
    if (!paymentMethodBreakdown) {
      return res.status(404).json({
        status: "error",
        message: "Payment method breakdown not found",
        isSuccess: false,
        data: null,
      });
    }

    // Validasi jika paymentTypeId diubah, pastikan kategori exists
    if (
      paymentTypeId &&
      paymentTypeId !== paymentMethodBreakdown.paymentTypeId
    ) {
      const categoryExists = await Payment_type.findByPk(paymentTypeId);
      if (!categoryExists) {
        return res.status(400).json({
          status: "error",
          message: "Payment type not found",
          isSuccess: false,
          data: null,
        });
      }
    }

    const updateData = {};

    // Hanya update field yang dikirim
    if (paymentTypeId !== undefined) updateData.paymentTypeId = paymentTypeId;
    if (jumlahTransaksi !== undefined)
      updateData.jumlahTransaksi = jumlahTransaksi;
    if (persenDariTotal !== undefined)
      updateData.persenDariTotal = persenDariTotal;
    if (revenue !== undefined) updateData.revenue = revenue;
    if (fee !== undefined) updateData.fee = fee;

    await paymentMethodBreakdown.update(updateData);

    // Fetch updated data with category information
    const updatedPaymentMethodBreakdown =
      await Payment_method_breakdown.findByPk(id, {
        include: [
          {
            model: Payment_type,
            as: "paymentType",
          },
        ],
      });

    res.status(200).json({
      status: "success",
      message: "Payment method breakdown updated successfully",
      isSuccess: true,
      data: { paymentMethodBreakdown: updatedPaymentMethodBreakdown },
    });
  } catch (error) {
    // Handle Sequelize validation errors
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

async function deletePaymentMethodBreakdown(req, res) {
  try {
    const { id } = req.params;

    const paymentMethodBreakdown = await Payment_method_breakdown.findByPk(id, {
      include: [
        {
          model: Payment_type,
          as: "paymentType",
        },
      ],
    });

    if (!paymentMethodBreakdown) {
      return res.status(404).json({
        status: "error",
        message: "Payment method breakdown not found",
        isSuccess: false,
        data: null,
      });
    }

    // Store data before deletion for response
    const deletedData = {
      id: paymentMethodBreakdown.id,
      paymentType: paymentMethodBreakdown.paymentType
        ? paymentMethodBreakdown.paymentType.name
        : null,
      jumlahTransaksi: paymentMethodBreakdown.jumlahTransaksi,
      persenDariTotal: paymentMethodBreakdown.persenDariTotal,
      revenue: paymentMethodBreakdown.revenue,
      fee: paymentMethodBreakdown.fee,
    };

    await paymentMethodBreakdown.destroy();

    res.status(200).json({
      status: "success",
      message: "Payment method breakdown deleted successfully",
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

async function getAllPaymentMethodBreakdowns(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      paymentTypeId,
      startDate,
      endDate,
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    // Filter by payment type
    if (paymentTypeId) {
      whereClause.paymentTypeId = paymentTypeId;
    }

    // Filter by date range
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

    const { count, rows } = await Payment_method_breakdown.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Payment_type,
          as: "paymentType",
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["inputDate", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      message: "Payment method breakdowns retrieved successfully",
      isSuccess: true,
      data: {
        paymentMethodBreakdowns: rows,
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
  getAllPaymentMethodBreakdowns,
  createPaymentMethodBreakdown,
  updatePaymentMethodBreakdown,
  deletePaymentMethodBreakdown,
};
