module.exports = {
  name: 'Balance Sheet',
  children: {
    assets: {
      name: 'Assets',
      total: 'Total Assets',
      children: {
        current: {
          name: 'Current Assets',
          total: 'Total Current Assets',
          children: {
            cash: {name: 'Cash'},
            accRcv: {name: 'Accounts Receivable'},
            securities: {name: 'Securities'},
            inventory: {name: 'Inventory'},
            other: {name: 'Other Current Assets'}
          }
        },
        nonCurrent: {
          name: 'Non-Current Assets',
          total: 'Total Non-Current Assets',
          children: {
            notes: {name: 'Notes to Related Parties'},
            invest: {name: 'Other Investments'},
            intangible: {name: 'Intangible Assets'},
            land: {name: 'Land'},
            depreciable: {name: 'Buildings & Other Depreciable Assets'},
            other: {name: 'Other Assets'}
          }
        }
      }
    },
    lAndE: {
      name: 'Liabilities & Equity',
      total: 'Total Liabilities & Equity',
      children: {
        liabilities: {
          name: 'Liabilities',
          total: 'Total Liabilities',
          children: {
            current: {
              name: 'Current Liabilities',
              total: 'Total Current Liabilities',
              children: {
                accPayable: {name: 'Accounts Payable'},
                shortDebt: {name: 'Debt Obligations < 1 Year'},
                other: {name: 'Other Current Liabilities'}
              }
            },
            nonCurrent: {
              name: 'Non-Current Liabilities',
              total: 'Total Non-Current Liabilities',
              children: {
                loans: {name: 'Loans from Related Parties'},
                longDebt: {name: 'Debt Obligations > 1 Year'},
                other: {name: 'Other Liabilities'}
              }
            }
          }
        },
        equity: {
          name: 'Equity',
          total: 'Total Equity',
          children: {
            outstanding: {name: 'Stock Outstanding'},
            additional: {name: 'Additional Paid in Capital'},
            repurchased: {name: 'Stock Repurchased'},
            adjustments: {name: 'Adjustments to Equity'},
            equity: {name: 'Equity'}
          }
        }
      }
    },
    revenue: {
      name: 'Revenue',
      total: 'Revenue (Net)',
      children: {
        gross: {name: 'Gross Revenue'},
        returns: {name: 'Returns & Allowances'},
        credits: {name: 'Credits'}
      }
    },
    cogs: {
      name: 'Cost of Goods Sold',
      total: 'Total Cost of Goods Sold',
      children: {
        materials: {name: 'Direct Materials'},
        labor: {name: 'Direct Labor'},
        overhead: {name: 'Direct Overhead'}
      }
    },
    expenses: {
      name: 'Expenses',
      total: 'Total Expenses',
      children: {
        operating: {
          name: 'Operating Expenses',
          total: 'Total Operating Expenses',
          children: {
            salaries: {name: 'Salaries & Wages'},
            officer: {name: 'Officer Compensation'},
            selling: {name: 'Selling, General, & Admin'},
            facilities: {name: 'Facilities Expense'},
            deduct: {name: 'Other Deductions'}
          }
        },
        nonOperating: {
          name: 'Non-Operating Expenses',
          total: 'Total Non-Operation Expenses',
          children: {
            interest: {name: 'Interest Expense'},
            fees: {name: 'Professional Fees'},
            taxes: {name: 'Taxes & Licenses'},
            depreciation: {name: 'Depreciation Expense'},
            amortization: {name: 'Amortization Expense'}
          }
        }
      }
    },
    other: {
      name: 'Extraordinary & Other Items',
      total: 'Total Extraordinary & Other Items',
      children: {
        income: {name: 'Other Income'},
        expense: {name: 'Other Expense'},
        gains: {name: 'Gains'},
        loss: {name: 'Losses'},
        other: {name: 'Other'}
      }
    }
  }
};
