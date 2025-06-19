'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Chart_of_accounts', [
      // ASSETS - Current Assets
      {
        accountCode: '1100',
        accountName: 'Kas',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1110',
        accountName: 'Bank',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1120',
        accountName: 'Piutang Usaha',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1130',
        accountName: 'Persediaan Bahan Baku',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1140',
        accountName: 'Persediaan Barang Jadi',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1150',
        accountName: 'Biaya Dibayar Dimuka',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // ASSETS - Fixed Assets
      {
        accountCode: '1200',
        accountName: 'Peralatan Dapur',
        accountType: 'ASSET',
        accountCategory: 'FIXED_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1210',
        accountName: 'Mesin Kopi',
        accountType: 'ASSET',
        accountCategory: 'FIXED_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1220',
        accountName: 'Furniture & Fixtures',
        accountType: 'ASSET',
        accountCategory: 'FIXED_ASSET',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '1230',
        accountName: 'Akumulasi Penyusutan Peralatan',
        accountType: 'ASSET',
        accountCategory: 'FIXED_ASSET',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // LIABILITIES - Current Liabilities
      {
        accountCode: '2100',
        accountName: 'Hutang Usaha',
        accountType: 'LIABILITY',
        accountCategory: 'CURRENT_LIABILITY',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '2110',
        accountName: 'Hutang Gaji',
        accountType: 'LIABILITY',
        accountCategory: 'CURRENT_LIABILITY',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '2120',
        accountName: 'Hutang Pajak',
        accountType: 'LIABILITY',
        accountCategory: 'CURRENT_LIABILITY',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '2130',
        accountName: 'Biaya Terutang',
        accountType: 'LIABILITY',
        accountCategory: 'CURRENT_LIABILITY',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // LIABILITIES - Long-term Liabilities
      {
        accountCode: '2200',
        accountName: 'Hutang Bank',
        accountType: 'LIABILITY',
        accountCategory: 'LONG_TERM_LIABILITY',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '2210',
        accountName: 'Hutang Jangka Panjang',
        accountType: 'LIABILITY',
        accountCategory: 'LONG_TERM_LIABILITY',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // EQUITY
      {
        accountCode: '3100',
        accountName: 'Modal Pemilik',
        accountType: 'EQUITY',
        accountCategory: 'CAPITAL',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '3200',
        accountName: 'Laba Ditahan',
        accountType: 'EQUITY',
        accountCategory: 'RETAINED_EARNINGS',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '3300',
        accountName: 'Laba Tahun Berjalan',
        accountType: 'EQUITY',
        accountCategory: 'RETAINED_EARNINGS',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // REVENUE
      {
        accountCode: '4100',
        accountName: 'Penjualan Makanan',
        accountType: 'REVENUE',
        accountCategory: 'OPERATING_REVENUE',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '4200',
        accountName: 'Penjualan Minuman',
        accountType: 'REVENUE',
        accountCategory: 'OPERATING_REVENUE',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '4300',
        accountName: 'Pendapatan Lainnya',
        accountType: 'REVENUE',
        accountCategory: 'OTHER_REVENUE',
        normalBalance: 'CREDIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // EXPENSES - Cost of Goods Sold
      {
        accountCode: '5100',
        accountName: 'Harga Pokok Penjualan',
        accountType: 'EXPENSE',
        accountCategory: 'COST_OF_GOODS_SOLD',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // EXPENSES - Operating Expenses
      {
        accountCode: '5200',
        accountName: 'Beban Gaji',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5300',
        accountName: 'Beban Listrik & Air',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5400',
        accountName: 'Beban Bahan Baku',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5500',
        accountName: 'Beban Kemasan',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5600',
        accountName: 'Beban Maintenance',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5700',
        accountName: 'Beban Gas',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5800',
        accountName: 'Beban Transportasi',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5900',
        accountName: 'Beban Kebersihan',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '5950',
        accountName: 'Beban Operasional Lainnya',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountCode: '6100',
        accountName: 'Biaya Bank & Fee Payment',
        accountType: 'EXPENSE',
        accountCategory: 'OTHER_EXPENSE',
        normalBalance: 'DEBIT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Chart_of_accounts', null, {});
  }
};
