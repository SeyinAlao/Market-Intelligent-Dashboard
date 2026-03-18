import type { MarketIndex, MostActiveStock, NewsArticle, FormattedStock,
  FormattedDashboardData, YahooIndex, YahooStock, YahooNewsArticle, YahooQuoteResponse,
  YahooQuoteSummaryResponse, PriceSummaryResult, FinancialDataResult, 
  RecommendationTrendResult, EarningsQuarterly, EarningsResult } from '../types';

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': API_KEY || '',
    'x-rapidapi-host': API_HOST || '',
    'Content-Type': 'application/json'
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const formatLargeNumber = (num?: number): string => {
  if (!num) return "0";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
};
const getRawNum = (val: { raw?: number } | number | undefined): number => {
  if (typeof val === 'number') return val;
  return val?.raw || 0;
};
const getFmtStr = (val: { fmt?: string } | string | undefined): string => {
  if (typeof val === 'string') return val;
  return val?.fmt || "N/A";
};
const formatStock = (stock: YahooStock): MostActiveStock => ({
  symbol: stock.symbol,
  name: stock.shortName || stock.longName || "Unknown",
  price: stock.regularMarketPrice || 0,
  changePercent: stock.regularMarketChangePercent || 0,
  volume: formatLargeNumber(stock.regularMarketVolume),
  marketCap: formatLargeNumber(stock.marketCap)
});
const extractQuotes = (data: YahooQuoteResponse): YahooStock[] => {
  return data?.finance?.result?.[0]?.quotes || data?.quoteResponse?.result || [];
};
export const fetchDashboardData = async (): Promise<FormattedDashboardData> => {
  if (!API_KEY) throw new Error("API Key is missing in .env file.");

  try {
    const indicesRes = await fetch(`https://${API_HOST}/api/market/get-world-indices?region=US&language=en-US`, options);
    const indicesData = await indicesRes.json();
    await delay(250);

    const activesRes = await fetch(`https://${API_HOST}/api/market/get-most-actives?offset=0&region=US&count=5&language=en-US&quote_type=EQUITY`, options);
    const activesData = await activesRes.json();
    await delay(250);

    const newsRes = await fetch(`https://${API_HOST}/api/news/list?region=US&snippetCount=10`, options);
    const newsData = await newsRes.json();

    console.log(" RAW NEWS DATA FROM API:", newsData);

    const rawIndices: YahooIndex[] = indicesData?.marketSummaryAndSparkResponse?.result || [];
    const formattedIndices: MarketIndex[] = rawIndices
      .filter((idx: YahooIndex) => ['^GSPC', '^DJI', '^IXIC'].includes(idx.symbol))
      .map((idx: YahooIndex) => ({
        symbol: idx.symbol,
        name: idx.shortName,
        price: idx.regularMarketPrice?.raw || 0,
        change: idx.regularMarketChange?.raw || 0,
        changePercent: idx.regularMarketChangePercent?.raw || 0
      }));
    const rawNews: YahooNewsArticle[] = Array.isArray(newsData) 
      ? newsData 
      : (newsData?.data?.main?.stream || newsData?.items || newsData?.news || newsData?.result || []);
    const formattedNews: NewsArticle[] = rawNews.slice(0, 5).map((article: YahooNewsArticle) => ({
      id: article.id || Math.random().toString(),
      title: article.content?.title || article.title || "Market News",
      publisher: article.content?.provider?.displayName || article.publisher || "Yahoo Finance",
      pubDate: article.content?.pubDate ? new Date(article.content.pubDate).toLocaleDateString() : "Today",
      thumbnail: article.content?.thumbnail?.resolutions?.[0]?.url || "https://via.placeholder.com/150",
      description: article.content?.summary || "Click to read more about this update...",
      url: article.content?.providerContentUrl || article.content?.clickThroughUrl?.url || article.link || "https://finance.yahoo.com/news"
    }));
    return {
      indices: formattedIndices,
      mostActive: extractQuotes(activesData).map(formatStock),
      news: formattedNews,
      gainers: [], 
      losers: []
    };
  } catch (error) {
    console.error("Error fetching dashboard API endpoints:", error);
    throw error;
  }
};
export const fetchMarketGainers = async (): Promise<MostActiveStock[]> => {
  if (!API_KEY) throw new Error("API Key is missing.");
  const res = await fetch(`https://${API_HOST}/api/market/get-day-gainers?offset=0&region=US&count=5&language=en-US&quote_type=EQUITY`, options);
  const data = await res.json();
  return extractQuotes(data).map(formatStock);
};
export const fetchMarketLosers = async (): Promise<MostActiveStock[]> => {
  if (!API_KEY) throw new Error("API Key is missing.");
  const res = await fetch(`https://${API_HOST}/api/market/get-day-losers?offset=0&region=US&count=5&language=en-US&quote_type=EQUITY`, options);
  const data = await res.json();
  return extractQuotes(data).map(formatStock);
};
export const fetchStockProfile = async (symbol: string): Promise<FormattedStock> => {
  if (!API_KEY) throw new Error("API Key is missing in .env file.");
  try {
    const [priceRes, financialRes, trendRes, earningsRes] = await Promise.all([
      fetch(`https://${API_HOST}/api/stock/get-price?region=US&symbol=${symbol}`, options),
      fetch(`https://${API_HOST}/api/stock/get-financial-data?region=US&symbol=${symbol}`, options),
      fetch(`https://${API_HOST}/api/stock/get-recommendation-trend?region=US&symbol=${symbol}`, options),
      fetch(`https://${API_HOST}/api/stock/get-earnings?region=US&symbol=${symbol}`, options)
    ]);
    const priceRaw = await priceRes.json() as YahooQuoteSummaryResponse<PriceSummaryResult>;
    const financialRaw = await financialRes.json() as YahooQuoteSummaryResponse<FinancialDataResult>;
    const trendRaw = await trendRes.json() as YahooQuoteSummaryResponse<RecommendationTrendResult>;
    const earningsRaw = await earningsRes.json() as YahooQuoteSummaryResponse<EarningsResult>;
    const extractData = <T>(data: YahooQuoteSummaryResponse<T>): Partial<T> => {
      return data?.quoteSummary?.result?.[0] || (data as unknown as Partial<T>) || {};
    };
    const priceResult = extractData<PriceSummaryResult>(priceRaw);
    const financialResult = extractData<FinancialDataResult>(financialRaw);
    const trendResult = extractData<RecommendationTrendResult>(trendRaw);
    const earningsResult = extractData<EarningsResult>(earningsRaw);
    const price = priceResult.price || {};
    const summary = priceResult.summaryDetail || {};
    const financialData = financialResult.financialData || {};
    const recommendationTrend = trendResult.recommendationTrend?.trend?.[0] || {};
    const earningsChart = earningsResult.earnings?.earningsChart?.quarterly || [];
    return {
      symbol: price.symbol || symbol,
      name: price.shortName || price.longName || symbol,
      price: getRawNum(price.regularMarketPrice),
      changeAmount: getRawNum(price.regularMarketChange),
      changePercent: getRawNum(price.regularMarketChangePercent),
      marketCap: formatLargeNumber(getRawNum(summary.marketCap)),
      peRatio: getRawNum(summary.trailingPE) === 0 ? "N/A" : getRawNum(summary.trailingPE).toFixed(2),
      high: getRawNum(summary.fiftyTwoWeekHigh) === 0 ? "N/A" : getRawNum(summary.fiftyTwoWeekHigh).toFixed(2),
      low: getRawNum(summary.fiftyTwoWeekLow) === 0 ? "N/A" : getRawNum(summary.fiftyTwoWeekLow).toFixed(2),
      volume: getRawNum(summary.volume),
      avgVolume: getRawNum(summary.averageVolume),
      financials: {
        totalRevenue: formatLargeNumber(getRawNum(financialData.totalRevenue)),
        revenueGrowth: getFmtStr(financialData.revenueGrowth),
        ebitda: formatLargeNumber(getRawNum(financialData.ebitda)),
        profitMargin: getFmtStr(financialData.profitMargins),
        totalCash: formatLargeNumber(getRawNum(financialData.totalCash)),
        totalDebt: formatLargeNumber(getRawNum(financialData.totalDebt)),
      },

      recommendationTrends: {
        buy: recommendationTrend.buy || 0,
        hold: recommendationTrend.hold || 0,
        sell: recommendationTrend.sell || 0,
        strongBuy: recommendationTrend.strongBuy || 0,
        strongSell: recommendationTrend.strongSell || 0,
      },

      earnings: {
        history: earningsChart.map((e: EarningsQuarterly) => ({
          date: e.date || "Unknown",
          actual: getRawNum(e.actual),
          estimate: getRawNum(e.estimate)
        }))
      }
    };
  } catch (error) {
    console.error(`Error fetching profile for ${symbol}:`, error);
    throw error;
  }
};