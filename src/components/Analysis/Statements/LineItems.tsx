import { ReactNode } from 'react'

export interface LineItem {
  name: ReactNode
  values: number[]
}

export interface LineItems {
  assets?: {
    current?: {
      cash?: LineItem[]
      accRcv?: LineItem[]
      securities?: LineItem[]
      inventory?: LineItem[]
      other?: LineItem[]
    }
    nonCurrent?: {
      notes?: LineItem[]
      invest?: LineItem[]
      intangible?: LineItem[]
      land?: LineItem[]
      depreciable?: LineItem[]
      other?: LineItem[]
    }
  }
  lAndE?: {
    liabilities?: {
      current?: {
        accPayable?: LineItem[]
        shortDebt?: LineItem[]
        other?: LineItem[]
      }
      nonCurrent?: {
        loans?: LineItem[]
        longDebt?: LineItem[]
        other?: LineItem[]
      }
    }
    equity?: {
      outstanding?: LineItem[]
      additional?: LineItem[]
      repurchased?: LineItem[]
      adjustments?: LineItem[]
      equity?: LineItem[]
    }
  }
  revenue?: {
    gross?: LineItem[]
    returns?: LineItem[]
    credits?: LineItem[]
  }
  cogs?: {
    materials?: LineItem[]
    labor?: LineItem[]
    overhead?: LineItem[]
  }
  expenses?: {
    operating?: {
      salaries?: LineItem[]
      officer?: LineItem[]
      selling?: LineItem[]
      facilities?: LineItem[]
      deduct?: LineItem[]
    }
    nonOperating?: {
      interest?: LineItem[]
      fees?: LineItem[]
      taxes?: LineItem[]
      depreciation?: LineItem[]
      amortization?: LineItem[]
    }
  }
  other?: {
    income?: LineItem[]
    expense?: LineItem[]
    gains?: LineItem[]
    loss?: LineItem[]
    other?: LineItem[]
  }
}
