import { fetchApi } from './apiClient';
import type { NewsArticle, YahooRawNewsItem } from '../types';

type NewsApiResponse = YahooRawNewsItem[] | {
  data?: {
    ntk?: { stream?: YahooRawNewsItem[] };
    main?: { stream?: YahooRawNewsItem[] };
  };
  items?: YahooRawNewsItem[];
  news?: YahooRawNewsItem[];
  result?: YahooRawNewsItem[];
};

export const fetchMarketNews = async (): Promise<NewsArticle[]> => {
  const newsData = await fetchApi<NewsApiResponse>('/api/news/list?region=US&snippetCount=10');
  
  let rawNews: YahooRawNewsItem[] = [];
  
  if (Array.isArray(newsData)) {
    rawNews = newsData;
  } else {
    rawNews = newsData?.data?.ntk?.stream || 
              newsData?.data?.main?.stream || 
              newsData?.items || 
              newsData?.news || 
              newsData?.result || [];
  }

  return rawNews.slice(0, 5).map((rawItem: YahooRawNewsItem) => {
    const article = rawItem.editorialContent || rawItem;
    const content = article.content || {};
    const publisherName = content.provider?.displayName || article.publisher || "Yahoo Finance";
    const directLink = content.providerContentUrl;
    const yahooLink = content.clickThroughUrl?.url || article.link;
    const finalUrl = (publisherName.includes("PA Media") || !directLink) 
      ? yahooLink 
      : directLink;
    const rawDate = article.publishTime || content.pubDate;

    return {
      id: article.id || Math.random().toString(),
      title: article.title || content.title || "Market News",
      publisher: publisherName,
      pubDate: rawDate ? new Date(rawDate).toLocaleDateString() : "Today",
      thumbnail: article.thumbnail?.resolutions?.[0]?.url || content.thumbnail?.resolutions?.[0]?.url || "https://via.placeholder.com/150",
      description: content.summary || "Click to read more about this update...",
      url: finalUrl || "https://finance.yahoo.com/news"
    };
  });
};