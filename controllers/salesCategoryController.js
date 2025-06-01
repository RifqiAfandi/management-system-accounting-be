const { Sales_category } = require('../models');

async function getAllSalesCategories(req, res) {
    try {
        const categories = await Sales_category.findAll();
        if (categories.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No sales categories found',
                isSuccess: false,
                data: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Sales categories retrieved successfully',
            isSuccess: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

module.exports = {
    getAllSalesCategories
};