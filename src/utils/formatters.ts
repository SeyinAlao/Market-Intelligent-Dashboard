import type { YahooStock, MostActiveStock, YahooQuoteResponse } from '../types';
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatLargeNumber = (num?: number): string => {
  if (!num) return "0";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
};

export const getRawNum = (val: { raw?: number } | number | undefined): number => {
  if (typeof val === 'number') return val;
  return val?.raw || 0;
};

export const getFmtStr = (val: { fmt?: string } | string | undefined): string => {
  if (typeof val === 'string') return val;
  return val?.fmt || "N/A";
};

export const formatStock = (stock: YahooStock): MostActiveStock => ({
  symbol: stock.symbol,
  name: stock.shortName || stock.longName || "Unknown",
  price: stock.regularMarketPrice || 0,
  changePercent: stock.regularMarketChangePercent || 0,
  volume: formatLargeNumber(stock.regularMarketVolume),
  marketCap: formatLargeNumber(stock.marketCap)
});

export const extractQuotes = (data: YahooQuoteResponse): YahooStock[] => {
  return data?.finance?.result?.[0]?.quotes || data?.quoteResponse?.result || [];
};