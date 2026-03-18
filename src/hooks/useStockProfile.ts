import { useQuery } from '@tanstack/react-query';
import { fetchStockProfile } from '../services/marketApi';
import type { FormattedStock } from '../types';

export const useStockProfile = (symbol: string | undefined) => {
  const { data, isLoading, isError, error } = useQuery<FormattedStock, Error>({
    queryKey: ['stockProfile', symbol], 
    
    queryFn: async () => {
      if (!symbol) throw new Error("No symbol provided");
      const CACHE_KEY = `market_stock_profile_${symbol}`;
      const CACHE_EXPIRY = 1000 * 60 * 60 * 12; 
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(`${CACHE_KEY}_time`);

      if (cachedData && cacheTime) {
        const isExpired = Date.now() - Number(cacheTime) > CACHE_EXPIRY;
        if (!isExpired) {
          console.log(` Using local cache for ${symbol}. API call saved!`);
          return JSON.parse(cachedData);
        }
      }
      console.log(` Fetching fresh API data for ${symbol}...`);
      const freshData = await fetchStockProfile(symbol);
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
      localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());

      return freshData;
    },

    enabled: !!symbol,
    staleTime: 1000 * 60 * 60 * 12,
  });

  return {
    stock: data || null,
    isLoading,
    error: isError ? error.message : null,
  };
};