const { 
  Chart_of_accounts, 
  Journal_entries, 
  Journal_entry_details, 
  General_ledger, 
  Balance_sheet_accounts,
  Sales_by_category,
  Daily_operational_cost,
  Payment_method_breakdown
} = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

class BalanceSheetController {
  // Get balance sheet for a specific period
  static async getBalanceSheet(req, res) {
    try {
      const { year, month } = req.query;
      const currentYear = year ? parseInt(year) : new Date().getFullYear();
      const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

      // Generate or update balance sheet accounts for the current period
      await BalanceSheetController.updateBalanceSheetAccounts(currentYear, currentMonth);

      // Generate balance sheet
      const balanceSheet = await Balance_sheet_accounts.generateBalanceSheet(currentYear, currentMonth);

      res.status(200).json({
        success: true,
        message: 'Balance sheet retrieved successfully',
        data: {
          period: {
            year: currentYear,
            month: currentMonth,
            monthName: new Date(currentYear, currentMonth - 1, 1).toLocaleDateString('id-ID', { month: 'long' })
          },
          balanceSheet: balanceSheet
        }
      });
    } catch (error) {
      console.error('Error getting balance sheet:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get trial balance
  static async getTrialBalance(req, res) {
    try {
      const { asOfDate } = req.query;
      const date = asOfDate ? new Date(asOfDate) : new Date();

      const trialBalance = await General_ledger.getTrialBalance(date);

      const totalDebits = trialBalance.reduce((sum, account) => sum + parseFloat(account.debitAmount || 0), 0);
      const totalCredits = trialBalance.reduce((sum, account) => sum + parseFloat(account.creditAmount || 0), 0);

      res.status(200).json({
        success: true,
        message: 'Trial balance retrieved successfully',
        data: {
          asOfDate: date.toISOString().split('T')[0],
          accounts: trialBalance,
          totals: {
            totalDebits: totalDebits,
            totalCredits: totalCredits,
            isBalanced: Math.abs(totalDebits - totalCredits) < 0.01
          }
        }
      });
    } catch (error) {
      console.error('Error getting trial balance:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Update balance sheet accounts based on current transactions
  static async updateBalanceSheetAccounts(year, month) {
    try {
      const accounts = await Chart_of_accounts.findAll({
        where: {
          isActive: true,
          accountType: ['ASSET', 'LIABILITY', 'EQUITY']
        }
      });

      for (const account of accounts) {
        await Balance_sheet_accounts.updateCurrentBalance(account.id, year, month);
      }

      return true;
    } catch (error) {
      console.error('Error updating balance sheet accounts:', error);
      throw error;
    }
  }

  // Create automatic journal entries from existing transactions
  static async createAutomaticJournalEntries(req, res) {
    try {
      const { startDate, endDate } = req.body;
      const start = startDate ? new Date(startDate) : new Date();
      const end = endDate ? new Date(endDate) : new Date();

      const results = {
        salesEntries: 0,
        operationalCostEntries: 0,
        paymentEntries: 0,
        totalEntries: 0
      };

      // Create journal entries for sales
      const salesData = await Sales_by_category.findAll({
        where: {
          createdAt: {
            [Op.between]: [start, end]
          }
        },
        include: ['category']
      });

      for (const sale of salesData) {
        await BalanceSheetController.createSalesJournalEntry(sale);
        results.salesEntries++;
      }

      // Create journal entries for operational costs
      const operationalCosts = await Daily_operational_cost.findAll({
        where: {
          createdAt: {
            [Op.between]: [start, end]
          }
        },
        include: ['operationalCostType']
      });

      for (const cost of operationalCosts) {
        await BalanceSheetController.createOperationalCostJournalEntry(cost);
        results.operationalCostEntries++;
      }

      // Create journal entries for payment fees
      const paymentBreakdowns = await Payment_method_breakdown.findAll({
        where: {
          createdAt: {
            [Op.between]: [start, end]
          },
          fee: {
            [Op.gt]: 0
          }
        },
        include: ['paymentType']
      });

      for (const payment of paymentBreakdowns) {
        await BalanceSheetController.createPaymentFeeJournalEntry(payment);
        results.paymentEntries++;
      }

      results.totalEntries = results.salesEntries + results.operationalCostEntries + results.paymentEntries;

      res.status(200).json({
        success: true,
        message: 'Automatic journal entries created successfully',
        data: results
      });
    } catch (error) {
      console.error('Error creating automatic journal entries:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Create journal entry for sales transaction
  static async createSalesJournalEntry(saleData) {
    try {
      const journalDate = saleData.createdAt.toISOString().split('T')[0];
      
      // Check if journal entry already exists for this sale
      const existingEntry = await Journal_entries.findOne({
        where: {
          referenceType: 'SALES',
          referenceId: saleData.id
        }
      });

      if (existingEntry) {
        return existingEntry; // Skip if already exists
      }

      // Create journal entry
      const journalEntry = await Journal_entries.create({
        journalDate: journalDate,
        description: `Penjualan ${saleData.category.nameCategory} - ${journalDate}`,
        referenceType: 'SALES',
        referenceId: saleData.id,
        status: 'POSTED'
      });

      // Get account mappings
      const cashAccount = await Chart_of_accounts.findOne({ where: { accountCode: '1100' } }); // Kas
      const revenueAccount = await Chart_of_accounts.findOne({ 
        where: { accountCode: saleData.category.nameCategory === 'Makanan' ? '4100' : '4200' } 
      });
      const cogsAccount = await Chart_of_accounts.findOne({ where: { accountCode: '5100' } }); // HPP
      const inventoryAccount = await Chart_of_accounts.findOne({ where: { accountCode: '1140' } }); // Persediaan

      // Create journal entry details for revenue
      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: cashAccount.id,
        debitAmount: saleData.revenue,
        creditAmount: 0,
        description: `Penerimaan kas dari penjualan ${saleData.category.nameCategory}`
      });

      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: revenueAccount.id,
        debitAmount: 0,
        creditAmount: saleData.revenue,
        description: `Pendapatan penjualan ${saleData.category.nameCategory}`
      });

      // Create journal entry details for COGS
      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: cogsAccount.id,
        debitAmount: saleData.hpp,
        creditAmount: 0,
        description: `HPP ${saleData.category.nameCategory}`
      });

      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: inventoryAccount.id,
        debitAmount: 0,
        creditAmount: saleData.hpp,
        description: `Penurunan persediaan ${saleData.category.nameCategory}`
      });

      return journalEntry;
    } catch (error) {
      console.error('Error creating sales journal entry:', error);
      throw error;
    }
  }

  // Create journal entry for operational cost
  static async createOperationalCostJournalEntry(costData) {
    try {
      const journalDate = costData.createdAt.toISOString().split('T')[0];
      
      // Check if journal entry already exists
      const existingEntry = await Journal_entries.findOne({
        where: {
          referenceType: 'OPERATIONAL_COST',
          referenceId: costData.id
        }
      });

      if (existingEntry) {
        return existingEntry;
      }

      // Map operational cost types to accounts
      const accountMapping = {
        'Gaji Harian': '5200',
        'Listrik & Air': '5300',
        'Bahan Baku': '5400',
        'Kemasan': '5500',
        'Maintenance': '5600',
        'Gas': '5700',
        'Transportasi': '5800',
        'Peralatan': '1200', // Asset if equipment purchase
        'Kebersihan': '5900'
      };

      const accountCode = accountMapping[costData.operationalCostType.operationalCostName] || '5950';
      
      // Create journal entry
      const journalEntry = await Journal_entries.create({
        journalDate: journalDate,
        description: `${costData.operationalCostType.operationalCostName} - ${costData.description || journalDate}`,
        referenceType: 'OPERATIONAL_COST',
        referenceId: costData.id,
        status: 'POSTED'
      });

      // Get accounts
      const expenseAccount = await Chart_of_accounts.findOne({ where: { accountCode: accountCode } });
      const cashAccount = await Chart_of_accounts.findOne({ where: { accountCode: '1100' } });

      // Create journal entry details
      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: expenseAccount.id,
        debitAmount: costData.amount,
        creditAmount: 0,
        description: costData.description || costData.operationalCostType.operationalCostName
      });

      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: cashAccount.id,
        debitAmount: 0,
        creditAmount: costData.amount,
        description: `Pembayaran ${costData.operationalCostType.operationalCostName}`
      });

      return journalEntry;
    } catch (error) {
      console.error('Error creating operational cost journal entry:', error);
      throw error;
    }
  }

  // Create journal entry for payment fees
  static async createPaymentFeeJournalEntry(paymentData) {
    try {
      const journalDate = paymentData.createdAt.toISOString().split('T')[0];
      
      // Check if journal entry already exists
      const existingEntry = await Journal_entries.findOne({
        where: {
          referenceType: 'PAYMENT',
          referenceId: paymentData.id
        }
      });

      if (existingEntry) {
        return existingEntry;
      }

      // Create journal entry for payment fee
      const journalEntry = await Journal_entries.create({
        journalDate: journalDate,
        description: `Biaya ${paymentData.paymentType.paymentName} - ${journalDate}`,
        referenceType: 'PAYMENT',
        referenceId: paymentData.id,
        status: 'POSTED'
      });

      // Get accounts
      const feeExpenseAccount = await Chart_of_accounts.findOne({ where: { accountCode: '6100' } }); // Biaya Bank & Fee
      const cashAccount = await Chart_of_accounts.findOne({ where: { accountCode: '1100' } });

      // Create journal entry details
      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: feeExpenseAccount.id,
        debitAmount: paymentData.fee,
        creditAmount: 0,
        description: `Biaya ${paymentData.paymentType.paymentName}`
      });

      await Journal_entry_details.create({
        journalEntryId: journalEntry.id,
        accountId: cashAccount.id,
        debitAmount: 0,
        creditAmount: paymentData.fee,
        description: `Pembayaran fee ${paymentData.paymentType.paymentName}`
      });

      return journalEntry;
    } catch (error) {
      console.error('Error creating payment fee journal entry:', error);
      throw error;
    }
  }

  // Get financial ratios
  static async getFinancialRatios(req, res) {
    try {
      const { year, month } = req.query;
      const currentYear = year ? parseInt(year) : new Date().getFullYear();
      const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

      const balanceSheet = await Balance_sheet_accounts.generateBalanceSheet(currentYear, currentMonth);

      // Calculate financial ratios
      const ratios = {
        currentRatio: balanceSheet.assets.totalCurrentAssets > 0 && balanceSheet.liabilities.totalCurrentLiabilities > 0
          ? (balanceSheet.assets.totalCurrentAssets / balanceSheet.liabilities.totalCurrentLiabilities).toFixed(2)
          : 'N/A',
        
        debtToEquityRatio: balanceSheet.equity.totalEquity > 0
          ? (balanceSheet.liabilities.totalLiabilities / balanceSheet.equity.totalEquity).toFixed(2)
          : 'N/A',
        
        workingCapital: (balanceSheet.assets.totalCurrentAssets - balanceSheet.liabilities.totalCurrentLiabilities).toFixed(2),
        
        assetTurnover: 'Requires revenue data', // TODO: Calculate when revenue data is available
        
        returnOnAssets: 'Requires net income data' // TODO: Calculate when P&L is implemented
      };

      res.status(200).json({
        success: true,
        message: 'Financial ratios calculated successfully',
        data: {
          period: {
            year: currentYear,
            month: currentMonth
          },
          ratios: ratios,
          balanceSheetSummary: {
            totalAssets: balanceSheet.assets.totalAssets,
            totalLiabilities: balanceSheet.liabilities.totalLiabilities,
            totalEquity: balanceSheet.equity.totalEquity,
            isBalanced: balanceSheet.isBalanced
          }
        }
      });
    } catch (error) {
      console.error('Error calculating financial ratios:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

module.exports = BalanceSheetController;
