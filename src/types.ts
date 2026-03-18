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

export interface FormattedStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  changeAmount: number;
  financials?: {
    totalRevenue?: string | number;
    revenueGrowth?: string;
    ebitda?: string | number;
    profitMargin?: string;
    totalCash?: string | number;
    totalDebt?: string | number;
  };
  earnings?: {
    history?: Array<{ date: string; actual: number; estimate: number }>;
  };
  recommendationTrends?: {
    buy: number;
    hold: number;
    sell: number;
    strongBuy: number;
    strongSell: number;
  };
  peRatio: string | number;
  marketCap: string | number;
  high: string | number;
  low: string | number;
  volume: string | number;
  avgVolume: string | number;
}
export interface FormattedDashboardData {
  indices: MarketIndex[];
  mostActive: MostActiveStock[];
  gainers: MostActiveStock[];
  losers: MostActiveStock[];
  news: NewsArticle[];
}

export interface YahooIndex {
  symbol: string;
  shortName: string;
  regularMarketPrice?: { raw: number };
  regularMarketChange?: { raw: number };
  regularMarketChangePercent?: { raw: number };
}

export interface YahooStock {
  symbol: string;
  shortName?: string;
  longName?: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
  regularMarketVolume?: number;
  marketCap?: number;
}

export interface YahooNewsArticle {
  id?: string;
  title?: string;
  publisher?: string;
  link?: string;
  content?: {
    title?: string;
    provider?: { displayName?: string };
    pubDate?: string;
    thumbnail?: { resolutions?: { url: string }[] };
    summary?: string;
    clickThroughUrl?: { url?: string };
      providerContentUrl?: string;
  };
}

export interface YahooQuoteResponse {
  finance?: { result?: { quotes: YahooStock[] }[] };
  quoteResponse?: { result?: YahooStock[] };
}

export interface YahooQuoteSummaryResponse<T> {
  quoteSummary?: {
    result?: T[];
  };
}

export interface PriceSummaryResult {
  price?: {
    symbol?: string;
    shortName?: string;
    longName?: string;
    regularMarketPrice?: { raw: number } | number;
    regularMarketChange?: { raw: number } | number;
    regularMarketChangePercent?: { raw: number } | number;
  };
  summaryDetail?: {
    marketCap?: { raw: number } | number;
    trailingPE?: { raw: number } | number;
    fiftyTwoWeekHigh?: { raw: number } | number;
    fiftyTwoWeekLow?: { raw: number } | number;
    volume?: { raw: number } | number;
    averageVolume?: { raw: number } | number;
  };
}

export interface FinancialDataResult {
  financialData?: {
    totalRevenue?: { raw: number } | number;
    revenueGrowth?: { fmt: string } | string;
    ebitda?: { raw: number } | number;
    profitMargins?: { fmt: string } | string;
    totalCash?: { raw: number } | number;
    totalDebt?: { raw: number } | number;
  };
}

export interface RecommendationTrendResult {
  recommendationTrend?: {
    trend?: {
      buy?: number;
      hold?: number;
      sell?: number;
      strongBuy?: number;
      strongSell?: number;
    }[];
  };
}

export interface EarningsQuarterly {
  date?: string;
  actual?: { raw: number } | number;
  estimate?: { raw: number } | number;
}

export interface EarningsResult {
  earnings?: {
    earningsChart?: {
      quarterly?: EarningsQuarterly[];
    };
  };
}

