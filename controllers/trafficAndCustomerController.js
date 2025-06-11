const { Traffic_and_customer_data } = require('../models');
const { Op } = require('sequelize');

const trafficAndCustomerController = {
  // Get traffic and customer data by date
  getDataByDate: async (req, res) => {
    try {
      const { date } = req.query;
      
      if (!date) {
        return res.status(400).json({
          success: false,
          message: 'Date parameter is required'
        });
      }

      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const data = await Traffic_and_customer_data.findAll({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lt]: endDate
          }
        },
        order: [['timeShift', 'ASC']]
      });

      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get all data
  getAllData: async (req, res) => {
    try {
      const data = await Traffic_and_customer_data.findAll({
        order: [['createdAt', 'DESC'], ['timeShift', 'ASC']]
      });

      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Create new traffic and customer data
  createData: async (req, res) => {
    try {
      const { timeShift, customerCount, transaction, description } = req.body;

      // Validate required fields
      if (!timeShift || !customerCount || !transaction) {
        return res.status(400).json({
          success: false,
          message: 'timeShift, customerCount, and transaction are required'
        });
      }

      // Validate timeShift values
      const validTimeShifts = ['07.00-15.00', '15.00-23.00'];
      if (!validTimeShifts.includes(timeShift)) {
        return res.status(400).json({
          success: false,
          message: 'timeShift must be either "07.00-15.00" or "15.00-23.00"'
        });
      }

      // Calculate conversion rate (transaction/customerCount * 100)
      const conversionRate = customerCount > 0 ? (transaction / customerCount * 100) : 0;

      const data = await Traffic_and_customer_data.create({
        timeShift,
        customerCount,
        transaction,
        conversionRate: conversionRate.toFixed(2),
        description: description || null
      });

      res.status(201).json({
        success: true,
        message: 'Traffic and customer data created successfully',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get available dates
  getAvailableDates: async (req, res) => {
    try {
      const dates = await Traffic_and_customer_data.findAll({
        attributes: [
          [Traffic_and_customer_data.sequelize.fn('DATE', Traffic_and_customer_data.sequelize.col('createdAt')), 'date']
        ],
        group: [Traffic_and_customer_data.sequelize.fn('DATE', Traffic_and_customer_data.sequelize.col('createdAt'))],
        order: [[Traffic_and_customer_data.sequelize.fn('DATE', Traffic_and_customer_data.sequelize.col('createdAt')), 'DESC']]
      });

      const dateList = dates.map(item => item.dataValues.date);

      res.status(200).json({
        success: true,
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
};

module.exports = trafficAndCustomerController;