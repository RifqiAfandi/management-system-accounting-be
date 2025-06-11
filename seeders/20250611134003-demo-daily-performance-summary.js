'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await queryInterface.bulkInsert('Daily_performance_summaries', [
      {
        dailyPerformanceSummaryMetricId: 1,
        dailyPerformanceSummaryTargetId: 1,
        actual: 2050000,
        achivement: 102.50,
        status: true,
        createdAt: today,
        updatedAt: today
      },
      {
        dailyPerformanceSummaryMetricId: 2,
        dailyPerformanceSummaryTargetId: 2,
        actual: 107,
        achivement: 107.00,
        status: true,
        createdAt: today,
        updatedAt: today
      },
      {
        dailyPerformanceSummaryMetricId: 3,
        dailyPerformanceSummaryTargetId: 3,
        actual: 19159,
        achivement: 76.64,
        status: false,
        createdAt: today,
        updatedAt: today
      },
      {
        dailyPerformanceSummaryMetricId: 4,
        dailyPerformanceSummaryTargetId: 4,
        actual: 28.50,
        achivement: 95.00,
        status: false,
        createdAt: today,
        updatedAt: today
      },

      {
        dailyPerformanceSummaryMetricId: 1,
        dailyPerformanceSummaryTargetId: 1,
        actual: 1820000,
        achivement: 91.00,
        status: false,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        dailyPerformanceSummaryMetricId: 2,
        dailyPerformanceSummaryTargetId: 2,
        actual: 88,
        achivement: 88.00,
        status: false,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        dailyPerformanceSummaryMetricId: 3,
        dailyPerformanceSummaryTargetId: 3,
        actual: 20682,
        achivement: 82.73,
        status: false,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        dailyPerformanceSummaryMetricId: 4,
        dailyPerformanceSummaryTargetId: 4,
        actual: 26.25,
        achivement: 87.50,
        status: false,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        dailyPerformanceSummaryMetricId: 1,
        dailyPerformanceSummaryTargetId: 1,
        actual: 2055000,
        achivement: 102.75,
        status: true,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        dailyPerformanceSummaryMetricId: 2,
        dailyPerformanceSummaryTargetId: 2,
        actual: 98,
        achivement: 98.00,
        status: false,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        dailyPerformanceSummaryMetricId: 3,
        dailyPerformanceSummaryTargetId: 3,
        actual: 20969,
        achivement: 83.88,
        status: false,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        dailyPerformanceSummaryMetricId: 4,
        dailyPerformanceSummaryTargetId: 4,
        actual: 31.20,
        achivement: 104.00,
        status: true,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Daily_performance_summaries', null, {});
  }
};
