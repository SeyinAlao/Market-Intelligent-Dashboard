import type { MarketIndex, MostActiveStock } from '../types';

export const mockMarketIndices: MarketIndex[] = [
  { symbol: "^GSPC", name: "S&P 500", price: 6869.50, change: 52.87, changePercent: 0.78 },
  { symbol: "^IXIC", name: "NASDAQ", price: 22807.48, change: 290.79, changePercent: 1.29 },
  { symbol: "^DJI", name: "Dow Jones", price: 48739.40, change: 238.14, changePercent: 0.49 }
];

export const mockMostActive: MostActiveStock[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 183.34, changePercent: 0.16, volume: "190.7M", marketCap: "4.45T" },
  { symbol: "AAL", name: "American Airlines", price: 11.79, changePercent: -5.38, volume: "125.6M", marketCap: "7.78B" },
  { symbol: "PLUG", name: "Plug Power Inc.", price: 2.29, changePercent: -7.66, volume: "87.9M", marketCap: "3.18B" },
  { symbol: "TTD", name: "The Trade Desk", price: 29.79, changePercent: 18.35, volume: "82.1M", marketCap: "14.56B" }
];

export const mockDayGainers: MostActiveStock[] = [
  { symbol: "SOC", name: "Sable Offshore Corp.", price: 13.85, changePercent: 37.26, volume: "19.4M", marketCap: "2.01B" },
  { symbol: "TNGX", name: "Tango Therapeutics", price: 16.83, changePercent: 36.27, volume: "17.9M", marketCap: "2.26B" },
  { symbol: "TTD", name: "The Trade Desk", price: 29.79, changePercent: 18.35, volume: "82.1M", marketCap: "14.56B" },
  { symbol: "EXPE", name: "Expedia Group", price: 251.54, changePercent: 13.69, volume: "8.0M", marketCap: "30.82B" },
  { symbol: "UNF", name: "UniFirst Corp.", price: 262.76, changePercent: 13.62, volume: "0.8M", marketCap: "4.75B" }
];

export const mockDayLosers: MostActiveStock[] = [
  { symbol: "AEO", name: "American Eagle", price: 19.33, changePercent: -13.89, volume: "13.7M", marketCap: "3.27B" },
  { symbol: "HYMC", name: "Hycroft Mining", price: 41.06, changePercent: -13.85, volume: "5.2M", marketCap: "3.40B" },
  { symbol: "IE", name: "Ivanhoe Electric", price: 13.64, changePercent: -12.89, volume: "2.2M", marketCap: "2.14B" },
  { symbol: "CIEN", name: "Ciena Corp.", price: 299.30, changePercent: -12.88, volume: "7.8M", marketCap: "42.34B" },
  { symbol: "IESC", name: "IES Holdings", price: 426.01, changePercent: -12.66, volume: "0.3M", marketCap: "8.48B" }
];


export const mockCurrencies = [
  { symbol: "EURUSD=X", name: "EUR/USD", price: 1.1620, change: -0.0012, changePercent: -0.10 },
  { symbol: "BTC-USD", name: "Bitcoin", price: 72588.07, change: -732.10, changePercent: -1.00 }
];