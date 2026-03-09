import type { StockPriceData } from '../types';

export const mockStockList: StockPriceData[] = [
  {symbol: "AAPL",companyName: "Apple Inc.",currentPrice: 262.52,changeAmount: -1.23,changePercent: -0.47, marketCap: 3858499371008, marketCapFormatted: "3.86T", volume: 39258957, volumeFormatted: "39.26M", peRatio: 31.2, fiftyTwoWeekHigh: 266.15, fiftyTwoWeekLow: 164.08, avgVolume: 58432109,
    financials: {
      totalRevenue: "435.62B",
      ebitda: "152.9B",
      profitMargin: "27.04%",
      revenueGrowth: "15.70%",
      totalCash: "66.91B",
      totalDebt: "90.51B",
      recommendation: "buy"
    },
    recommendationTrends: {
      buy: 25,
      strongBuy: 5,
      hold: 16,
      sell: 1,
      strongSell: 1
    },
    earnings: {
      nextEarningsDate: "2026-04-30",
      lastQuarterActual: 2.84,
      lastQuarterEstimate: 2.67,
      history: [
        { date: "1Q2025", actual: 1.65, estimate: 1.62 },
        { date: "2Q2025", actual: 1.57, estimate: 1.43 },
        { date: "3Q2025", actual: 1.85, estimate: 1.77 },
        { date: "4Q2025", actual: 2.84, estimate: 2.67 }
      ]
    },
    recentDevelopments: [
      {
        date: "2025-01-30",
        headline: "Apple Posts Q1 EPS $2.40 Versus Estimate $2.35",
        description: "iPhone 16 models selling better in markets where Apple Intelligence is available."
      },
      {
        date: "2024-10-30",
        headline: "Apple CEO Cook Says Supply Constrained Today On Several Models Of The iPhone 17",
        description: "Not predicting when supply constraints will ease."
      }
    ]
  },
  {symbol: "NVDA", companyName: "NVIDIA Corp.", currentPrice: 138.25, changeAmount: 2.45, changePercent: 1.80, marketCap: 3410000000000, marketCapFormatted: "3.41T", volume: 110000000, volumeFormatted: "110M", peRatio: 65.2, fiftyTwoWeekHigh: 144.42, fiftyTwoWeekLow: 45.43, avgVolume: 240000000, financials: {
      totalRevenue: "109.20B",
      ebitda: "62.5B",
      profitMargin: "55.12%",
      revenueGrowth: "262.00%",
      totalCash: "25.9B",
      totalDebt: "9.7B",
      recommendation: "strong buy"
    },
    recommendationTrends: {
      buy: 38,
      strongBuy: 15,
      hold: 4,
      sell: 0,
      strongSell: 0
    },
    earnings: {
      nextEarningsDate: "2026-05-20",
      lastQuarterActual: 0.68,
      lastQuarterEstimate: 0.64,
      history: [
        { date: "1Q2025", actual: 0.42, estimate: 0.37 },
        { date: "2Q2025", actual: 0.51, estimate: 0.45 },
        { date: "3Q2025", actual: 0.60, estimate: 0.55 },
        { date: "4Q2025", actual: 0.68, estimate: 0.64 }
      ]
    },
    recentDevelopments: [
      {
        date: "2025-02-15",
        headline: "NVIDIA Announces Next-Gen Blackwell Ultra Chips",
        description: "Demand for AI infrastructure continues to outpace supply globally."
      }
    ]
  },
  { symbol: "TSLA", companyName: "Tesla, Inc.", currentPrice: 405.94, changeAmount: 13.51, changePercent: 3.44, marketCap: 1523262160896,
    marketCapFormatted: "1.52T", volume: 67670354, volumeFormatted: "67.67M", peRatio: 78.4, fiftyTwoWeekHigh: 408.33, fiftyTwoWeekLow: 138.80, avgVolume: 105000000
  },
  { symbol: "MSFT", companyName: "Microsoft Corp.", currentPrice: 415.60, changeAmount: -2.10, changePercent: -0.50, marketCap: 3100000000000, marketCapFormatted: "3.10T", volume: 18500000, volumeFormatted: "18.5M", peRatio: 34.1, fiftyTwoWeekHigh: 468.35, fiftyTwoWeekLow: 362.40, avgVolume: 22000000
  },
  { symbol: "AMZN", companyName: "Amazon.com, Inc.", currentPrice: 198.75, changeAmount: 1.25, changePercent: 0.63, marketCap: 2050000000000, marketCapFormatted: "2.05T", volume: 35000000, volumeFormatted: "35M", peRatio: 42.8, fiftyTwoWeekHigh: 202.50, fiftyTwoWeekLow: 134.10, avgVolume: 40000000
  },
  { symbol: "GOOGL", companyName: "Alphabet Inc.", currentPrice: 172.40, changeAmount: -0.80, changePercent: -0.46, marketCap: 2150000000000, marketCapFormatted: "2.15T", volume: 21000000, volumeFormatted: "21M", peRatio: 23.5, fiftyTwoWeekHigh: 193.30,
    fiftyTwoWeekLow: 130.60,
    avgVolume: 25000000
  },
  { symbol: "META", companyName: "Meta Platforms", currentPrice: 585.20, changeAmount: 4.15, changePercent: 0.71, marketCap: 1480000000000, marketCapFormatted: "1.48T", volume: 12000000, volumeFormatted: "12M", peRatio: 28.9, fiftyTwoWeekHigh: 602.95,
    fiftyTwoWeekLow: 314.50,
    avgVolume: 15000000
  },
  { symbol: "AMD", companyName: "AMD, Inc.", currentPrice: 156.30, changeAmount: -3.40, changePercent: -2.12, marketCap: 252000000000, marketCapFormatted: "252B", volume: 48000000, volumeFormatted: "48M", peRatio: 165.4, fiftyTwoWeekHigh: 227.30,
    fiftyTwoWeekLow: 130.10,
    avgVolume: 55000000
  },
  { symbol: "NFLX", companyName: "Netflix, Inc.", currentPrice: 820.15, changeAmount: 12.60, changePercent: 1.56, marketCap: 350000000000, marketCapFormatted: "350B", volume: 4500000, volumeFormatted: "4.5M", peRatio: 45.2, fiftyTwoWeekHigh: 840.00,
    fiftyTwoWeekLow: 445.20,
    avgVolume: 3500000
  },
  { symbol: "AVGO", companyName: "Broadcom Inc.", currentPrice: 175.40, changeAmount: 5.20, changePercent: 3.05, marketCap: 815000000000, marketCapFormatted: "815B", volume: 18000000, volumeFormatted: "18M", peRatio: 68.1, fiftyTwoWeekHigh: 185.20,
    fiftyTwoWeekLow: 104.50,
    avgVolume: 20000000
  }
];

export const mockPerformanceData = [
  { date: 'Sep 2025', price: 175.0 },
  { date: 'Oct 2025', price: 172.5 },
  { date: 'Nov 2025', price: 178.5 },
  { date: 'Dec 2025', price: 180.0 },
  { date: 'Jan 2026', price: 176.5 },
  { date: 'Feb 2026', price: 182.45 },
];