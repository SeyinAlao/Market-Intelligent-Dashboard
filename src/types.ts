export interface EarningsHistory {
  date: string;
  actual: number;
  estimate: number;
}
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  publisher: string;
  pubDate: string;
  thumbnail: string;
  url: string;
}
export interface MostActiveStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}
export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface NewsItem {
  id: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number;
  thumbnail?: {
    resolutions: { url: string; width: number; height: number }[];
  };
}

export interface StockPriceData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  changeAmount: number;
  changePercent: number;
  marketCap: number;
  marketCapFormatted: string;
  peRatio: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  volume: number;
  volumeFormatted: string;
  avgVolume: number;
  financials?: {
    totalRevenue: string;
    ebitda: string;
    profitMargin: string;
    revenueGrowth: string;
    totalCash: string;
    totalDebt: string;
    recommendation: string;
  };
  recommendationTrends?: {
    buy: number;
    strongBuy: number;
    hold: number;
    sell: number;
    strongSell: number;
  };
  earnings?: {
    nextEarningsDate: string;
    lastQuarterActual: number;
    lastQuarterEstimate: number;
    history: EarningsHistory[];
  };
  recentDevelopments?: {
    date: string;
    headline: string;
    description: string;
  }[];
}

export interface StockItem {
  symbol: string;
  name?: string;
  companyName?: string;
  price: number;
  changePercent: number;
}

export interface StockListWidgetProps {
  title?: string;
  data: StockItem[];
  isTabbed?: boolean;
}