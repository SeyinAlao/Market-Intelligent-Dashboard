import { fetchApi } from './apiClient';
import { formatStock, extractQuotes } from '../utils/formatters';
import type { MarketIndex, MostActiveStock, YahooIndex, YahooQuoteResponse } from '../types';

interface YahooIndicesResponse {
  marketSummaryAndSparkResponse?: {
    result?: YahooIndex[];
  };
}

export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  const indicesData = await fetchApi<YahooIndicesResponse>('/api/market/get-world-indices?region=US&language=en-US');
  
  const rawIndices: YahooIndex[] = indicesData?.marketSummaryAndSparkResponse?.result || [];
  
  return rawIndices
    .filter((idx: YahooIndex) => ['^GSPC', '^DJI', '^IXIC'].includes(idx.symbol))
    .map((idx: YahooIndex) => ({
      symbol: idx.symbol,
      name: idx.shortName,
      price: idx.regularMarketPrice?.raw || 0,
      change: idx.regularMarketChange?.raw || 0,
      changePercent: idx.regularMarketChangePercent?.raw || 0
    }));
};

export const fetchMostActives = async (): Promise<MostActiveStock[]> => {
  const activesData = await fetchApi<YahooQuoteResponse>('/api/market/get-most-actives?offset=0&region=US&count=5&language=en-US&quote_type=EQUITY');
  return extractQuotes(activesData).map(formatStock);
};

export const fetchMarketGainers = async (): Promise<MostActiveStock[]> => {
  const data = await fetchApi<YahooQuoteResponse>('/api/market/get-day-gainers?offset=0&region=US&count=5&language=en-US&quote_type=EQUITY');
  return extractQuotes(data).map(formatStock);
};

export const fetchMarketLosers = async (): Promise<MostActiveStock[]> => {
  const data = await fetchApi<YahooQuoteResponse>('/api/market/get-day-losers?offset=0&region=US&count=5&language=en-US&quote_type=EQUITY');
  return extractQuotes(data).map(formatStock);
};