'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    // Initial opening balances for the cafe business
    await queryInterface.bulkInsert('Balance_sheet_accounts', [
      // Assets
      {
        accountId: 1, // Kas
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 5000000, // 5 juta kas awal
        currentBalance: 5000000,
        closingBalance: 5000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountId: 2, // Bank
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 15000000, // 15 juta di bank
        currentBalance: 15000000,
        closingBalance: 15000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountId: 6, // Persediaan Bahan Baku
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 3000000, // 3 juta persediaan awal
        currentBalance: 3000000,
        closingBalance: 3000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountId: 7, // Persediaan Barang Jadi
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 2000000, // 2 juta barang jadi
        currentBalance: 2000000,
        closingBalance: 2000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountId: 9, // Peralatan Dapur
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 25000000, // 25 juta peralatan dapur
        currentBalance: 25000000,
        closingBalance: 25000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountId: 10, // Mesin Kopi
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 15000000, // 15 juta mesin kopi
        currentBalance: 15000000,
        closingBalance: 15000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountId: 11, // Furniture & Fixtures
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 20000000, // 20 juta furniture
        currentBalance: 20000000,
        closingBalance: 20000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Liabilities
      {
        accountId: 13, // Hutang Usaha
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 2000000, // 2 juta hutang supplier
        currentBalance: 2000000,
        closingBalance: 2000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountId: 17, // Hutang Bank
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 30000000, // 30 juta hutang bank
        currentBalance: 30000000,
        closingBalance: 30000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Equity
      {
        accountId: 19, // Modal Pemilik
        periodYear: currentYear,
        periodMonth: currentMonth,
        openingBalance: 53000000, // Modal awal pemilik (balancing amount)
        currentBalance: 53000000,
        closingBalance: 53000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Balance_sheet_accounts', null, {});
  }
};
