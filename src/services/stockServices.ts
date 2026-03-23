import { fetchApi } from './apiClient';
import { formatLargeNumber, getRawNum, getFmtStr } from '../utils/formatters';
import type { 
  FormattedStock, 
  YahooQuoteSummaryResponse, 
  PriceSummaryResult, 
  FinancialDataResult, 
  RecommendationTrendResult, 
  EarningsQuarterly, 
  EarningsResult 
} from '../types';

export const fetchStockProfile = async (symbol: string): Promise<FormattedStock> => {
  const [priceRaw, financialRaw, trendRaw, earningsRaw] = await Promise.all([
    fetchApi<YahooQuoteSummaryResponse<PriceSummaryResult>>(`/api/stock/get-price?region=US&symbol=${symbol}`),
    fetchApi<YahooQuoteSummaryResponse<FinancialDataResult>>(`/api/stock/get-financial-data?region=US&symbol=${symbol}`),
    fetchApi<YahooQuoteSummaryResponse<RecommendationTrendResult>>(`/api/stock/get-recommendation-trend?region=US&symbol=${symbol}`),
    fetchApi<YahooQuoteSummaryResponse<EarningsResult>>(`/api/stock/get-earnings?region=US&symbol=${symbol}`)
  ]);
  
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
};