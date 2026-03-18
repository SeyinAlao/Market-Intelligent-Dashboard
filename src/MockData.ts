export interface StockItem {
  symbol: string;
  price: number;
  changePercent: number;
}

export const mockGainers: StockItem[] = [
  { symbol: 'NVDA', price: 875.28, changePercent: 4.12 },
  { symbol: 'AMD', price: 178.50, changePercent: 2.85 },
  { symbol: 'META', price: 505.10, changePercent: 1.95 },
];

export const mockLosers: StockItem[] = [
  { symbol: 'TSLA', price: 175.22, changePercent: -3.45 },
  { symbol: 'AAPL', price: 170.12, changePercent: -1.22 },
  { symbol: 'BA', price: 188.85, changePercent: -0.95 },
];

export const mockActive: StockItem[] = [
  { symbol: 'AMZN', price: 178.15, changePercent: 0.45 },
  { symbol: 'MSFT', price: 420.55, changePercent: 0.85 },
  { symbol: 'GOOGL', price: 148.20, changePercent: -0.15 },
];