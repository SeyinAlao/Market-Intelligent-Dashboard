import { useState, useEffect } from 'react';
import { mockStockList } from '../MOCKDATA/mockStocks'; 
import { mockDayGainers, mockDayLosers, mockMostActive } from '../MOCKDATA/mockMarket';
import type { StockPriceData, MostActiveStock, FormattedStock } from '../types';

type RawStockData = StockPriceData | MostActiveStock;

const fetchStockData = async (symbol: string): Promise<FormattedStock> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      const allSources: RawStockData[] = [...mockStockList, ...mockDayGainers, ...mockDayLosers, ...mockMostActive];
      const rawStock = allSources.find(s => s.symbol === symbol);

      if (!rawStock) {
        reject(new Error("Stock not found"));
        return;
      }
      const asDetail = rawStock as Partial<StockPriceData>;
      const asActive = rawStock as Partial<MostActiveStock>;

      resolve({
        symbol: rawStock.symbol,
        name: asDetail.companyName ?? asActive.name ?? 'Unknown',
        price: asDetail.currentPrice ?? asActive.price ?? 0,
        changePercent: rawStock.changePercent ?? 0,
        changeAmount: asDetail.changeAmount ?? 0, 
        financials: asDetail.financials,
        earnings: asDetail.earnings,
        recommendationTrends: asDetail.recommendationTrends,
        peRatio: asDetail.peRatio ?? 'N/A',
        marketCap: asDetail.marketCapFormatted ?? asDetail.marketCap ?? 'N/A',
        high: asDetail.fiftyTwoWeekHigh ?? 'N/A',
        low: asDetail.fiftyTwoWeekLow ?? 'N/A',
        volume: asDetail.volumeFormatted ?? asDetail.volume ?? asActive.volume ?? 'N/A',
        avgVolume: asDetail.avgVolume ?? 'N/A',
      });
    }, 500); 
  });
};

export const useStockProfile = (symbol: string | undefined) => {
  const [stock, setStock] = useState<FormattedStock | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    let isMounted = true; 
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchStockData(symbol);
        if (isMounted) {
          setStock(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            typeof err === 'object' && err !== null && 'message' in err
              ? (err as { message: string }).message
              : 'Something went wrong'
          );
          setStock(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [symbol]);

  return { stock, isLoading, error };
};