const { Sales_category, Sales_by_category } = require('../models');

async function getAllSalesCategories(req, res) {
    try {
        const categories = await Sales_category.findAll({
            order: [['nameCategory', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Sales categories retrieved successfully',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function createSalesCategory(req, res) {
    try {
        const { nameCategory } = req.body;

        if (!nameCategory) {
            return res.status(400).json({
                success: false,
                message: 'nameCategory is required'
            });
        }

        // Check if category already exists
        const existingCategory = await Sales_category.findOne({
            where: { nameCategory }
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        const newCategory = await Sales_category.create({ nameCategory });

        res.status(201).json({
            success: true,
            message: 'Sales category created successfully',
            data: newCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function updateSalesCategory(req, res) {
    try {
        const { id } = req.params;
        const { nameCategory } = req.body;

        if (!nameCategory) {
            return res.status(400).json({
                success: false,
                message: 'nameCategory is required'
            });
        }

        const category = await Sales_category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Sales category not found'
            });
        }

        // Check if new name already exists (excluding current category)
        const existingCategory = await Sales_category.findOne({
            where: { 
                nameCategory,
                id: { [require('sequelize').Op.ne]: id }
            }
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        await category.update({ nameCategory });

        res.status(200).json({
            success: true,
            message: 'Sales category updated successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function deleteSalesCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Sales_category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Sales category not found'
            });
        }

        await category.destroy();

        res.status(200).json({
            success: true,
            message: 'Sales category deleted successfully',
            data: { id: parseInt(id) }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function getSalesByCategoryByDate(req, res) {
    try {
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

        const salesData = await Sales_by_category.findAll({
            include: [
                {
                    model: Sales_category,
                    as: 'category',
                    attributes: ['id', 'nameCategory']
                }
            ],
            where: {
                createdAt: {
                    [require('sequelize').Op.between]: [startDate, endDate]
                }
            },
            order: [['createdAt', 'DESC']]
        });

        // Transform the data to match frontend expectations
        const transformedData = salesData.map(item => ({
            id: item.id,
            timeShift: item.category ? item.category.nameCategory : 'Unknown Category',
            customerCount: parseFloat(item.revenue) || 0, // Using revenue as customerCount for display
            transaction: parseFloat(item.qtyTerjual) || 0, // Using qtyTerjual as transaction count
            conversionRate: parseFloat(item.margin) || 0, // Using margin as conversion rate
            description: `Sales data for ${item.category ? item.category.nameCategory : 'Unknown Category'}`,
            createdAt: item.createdAt
        }));

        res.status(200).json({
            success: true,
            message: 'Sales by category data retrieved successfully',
            data: transformedData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function getAvailableDates(req, res) {
    try {
        const dates = await Sales_by_category.findAll({
            attributes: [
                [Sales_by_category.sequelize.fn('DATE', Sales_by_category.sequelize.col('createdAt')), 'date']
            ],
            group: [Sales_by_category.sequelize.fn('DATE', Sales_by_category.sequelize.col('createdAt'))],
            order: [[Sales_by_category.sequelize.fn('DATE', Sales_by_category.sequelize.col('createdAt')), 'DESC']]
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
    getAllSalesCategories,
    createSalesCategory,
    updateSalesCategory,
    deleteSalesCategory,
    getSalesByCategoryByDate,
    getAvailableDates
};