const { Payment_method_breakdown } = require("../models");
const { Payment_type } = require("../models");
const { Op } = require("sequelize");

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
    }    // Filter by date range
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

    const { count, rows } = await Payment_method_breakdown.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Payment_type,
          as: "paymentType",
        },
      ],      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
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

async function getPaymentMethodBreakdownByDate(req, res) {
  try {
    console.log('getPaymentMethodBreakdownByDate called'); // Debug log
    console.log('Query params:', req.query); // Debug log
    console.log('User from token:', req.user); // Debug log
    
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    // Parse the date and create start/end of day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    console.log('Date range:', { startDate, endDate }); // Debug log

    const paymentData = await Payment_method_breakdown.findAll({
      include: [
        {
          model: Payment_type,
          as: 'paymentType',
          attributes: ['id', 'paymentName']
        }
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['createdAt', 'DESC']]
    });

    console.log('Found data:', paymentData.length, 'records'); // Debug log

    res.status(200).json({
      success: true,
      message: 'Payment method breakdown data retrieved successfully',
      data: paymentData
    });
  } catch (error) {
    console.error('Error in getPaymentMethodBreakdownByDate:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

async function getAvailableDates(req, res) {
  try {
    const dates = await Payment_method_breakdown.findAll({
      attributes: [
        [Payment_method_breakdown.sequelize.fn('DATE', Payment_method_breakdown.sequelize.col('createdAt')), 'date']
      ],
      group: [Payment_method_breakdown.sequelize.fn('DATE', Payment_method_breakdown.sequelize.col('createdAt'))],
      order: [[Payment_method_breakdown.sequelize.fn('DATE', Payment_method_breakdown.sequelize.col('createdAt')), 'DESC']]
    });

    const dateList = dates.map(item => item.dataValues.date);

    res.status(200).json({
      success: true,
      message: 'Available dates retrieved successfully',
      data: dateList
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
  getAllPaymentMethodBreakdowns,
  createPaymentMethodBreakdown,
  updatePaymentMethodBreakdown,
  deletePaymentMethodBreakdown,
  getPaymentMethodBreakdownByDate,
  getAvailableDates
};
