const { Sales_by_category } = require("../models");
const { Sales_category } = require("../models");

async function createSalesByCategory(req, res) {
  try {
    const { salesCategoryId, qtyTerjual, revenue, hpp, margin } = req.body;

    // Validasi apakah salesCategoryId exist
    const categoryExists = await Sales_category.findByPk(salesCategoryId);
    if (!categoryExists) {
      return res.status(400).json({
        status: "error",
        message: "Sales category not found",
        isSuccess: false,
        data: null,
      });
    }

    const newSalesEntry = await Sales_by_category.create({
      salesCategoryId,
      qtyTerjual,
      revenue,
      hpp,
      margin,
    });

    // Include category information in response
    const salesWithCategory = await Sales_by_category.findByPk(
      newSalesEntry.id,
      {
        include: [
          {
            model: Sales_category,
            as: "category",
          },
        ],
      }
    );

    res.status(201).json({
      status: "success",
      message: "Sales entry created successfully",
      isSuccess: true,
      data: { newSalesEntry: salesWithCategory },
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

async function updateSalesByCategory(req, res) {
  try {
    const { id } = req.params;
    const { salesCategoryId, qtyTerjual, revenue, hpp, margin } = req.body;

    const salesEntry = await Sales_by_category.findByPk(id);
    if (!salesEntry) {
      return res.status(404).json({
        status: "error",
        message: "Sales entry not found",
        isSuccess: false,
        data: null,
      });
    }

    // Validasi jika salesCategoryId diubah, pastikan kategori exists
    if (salesCategoryId && salesCategoryId !== salesEntry.salesCategoryId) {
      const categoryExists = await Sales_category.findByPk(salesCategoryId);
      if (!categoryExists) {
        return res.status(400).json({
          status: "error",
          message: "Sales category not found",
          isSuccess: false,
          data: null,
        });
      }
    }

    const updateData = {};

    // Hanya update field yang dikirim
    if (salesCategoryId !== undefined)
      updateData.salesCategoryId = salesCategoryId;
    if (qtyTerjual !== undefined) updateData.qtyTerjual = qtyTerjual;
    if (revenue !== undefined) updateData.revenue = revenue;
    if (hpp !== undefined) updateData.hpp = hpp;
    if (margin !== undefined) updateData.margin = margin;

    await salesEntry.update(updateData);

    // Fetch updated data with category information
    const updatedSalesEntry = await Sales_by_category.findByPk(id, {
      include: [
        {
          model: Sales_category,
          as: "category",
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "Sales entry updated successfully",
      isSuccess: true,
      data: { salesEntry: updatedSalesEntry },
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

async function deleteSalesByCategory(req, res) {
  try {
    const { id } = req.params;

    const salesEntry = await Sales_by_category.findByPk(id, {
      include: [
        {
          model: Sales_category,
          as: "category",
        },
      ],
    });

    if (!salesEntry) {
      return res.status(404).json({
        status: "error",
        message: "Sales entry not found",
        isSuccess: false,
        data: null,
      });
    }

    // Store data before deletion for response
    const deletedData = {
      id: salesEntry.id,
      category: salesEntry.category ? salesEntry.category.nameCategory : null,
      qtyTerjual: salesEntry.qtyTerjual,
      revenue: salesEntry.revenue,
    };

    await salesEntry.destroy();

    res.status(200).json({
      status: "success",
      message: "Sales entry deleted successfully",
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

async function getAllSalesByCategory(req, res) {
  try {
    const { page = 1, limit = 10, categoryId } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    // Filter by category
    if (categoryId) {
      whereClause.salesCategoryId = categoryId;
    }

    const { count, rows } = await Sales_by_category.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Sales_category,
          as: "category",
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["ASC", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      message: "Sales entries retrieved successfully",
      isSuccess: true,
      data: {
        salesEntries: rows,
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
  getAllSalesByCategory,
  createSalesByCategory,
  updateSalesByCategory,
  deleteSalesByCategory,
};
