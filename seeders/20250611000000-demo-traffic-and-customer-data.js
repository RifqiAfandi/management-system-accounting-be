'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await queryInterface.bulkInsert('Traffic_and_customer_data', [
      // Data for today
      {
        timeShift: '07.00-15.00',
        customerCount: 150,
        transaction: 120,
        conversionRate: 80.00,
        description: 'Morning shift with good customer conversion',
        createdAt: today,
        updatedAt: today
      },
      {
        timeShift: '15.00-23.00',
        customerCount: 200,
        transaction: 180,
        conversionRate: 90.00,
        description: 'Evening shift with excellent conversion rate',
        createdAt: today,
        updatedAt: today
      },
      // Data for yesterday
      {
        timeShift: '07.00-15.00',
        customerCount: 130,
        transaction: 100,
        conversionRate: 76.92,
        description: 'Morning shift yesterday',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        timeShift: '15.00-23.00',
        customerCount: 180,
        transaction: 150,
        conversionRate: 83.33,
        description: 'Evening shift yesterday',
        createdAt: yesterday,
        updatedAt: yesterday
      },
      // Data for two days ago
      {
        timeShift: '07.00-15.00',
        customerCount: 140,
        transaction: 110,
        conversionRate: 78.57,
        description: 'Morning shift two days ago',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        timeShift: '15.00-23.00',
        customerCount: 190,
        transaction: 160,
        conversionRate: 84.21,
        description: 'Evening shift two days ago',
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Traffic_and_customer_data', null, {});
  }
};
