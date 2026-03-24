import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBar from '../components/UI/SearchBar';
import StockListWidget from '../components/Dashboard/StockListWidget';
import NewsCard from '../components/Dashboard/NewsCard';
import IndexWidget from '../components/Dashboard/IndexWidget';
import ThemeToggle from '../components/UI/ThemeToggle';
import { fetchMarketIndices, fetchMostActives, fetchMarketGainers, fetchMarketLosers,} from '../services/marketApi';
import { fetchMarketNews } from '../services/newsService';
import { IndexSkeleton, NewsSkeleton, StockListSkeleton } from '../components/UI/Skeletons';

const DashboardHome = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState('active');
  const {
    data: indicesData,
    isLoading: isLoadingIndices,
    isError: isErrorIndices,
    isFetching: isFetchingIndices,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['marketIndices'],
    queryFn: fetchMarketIndices,
  });

  const {
    data: mostActiveData,
    isLoading: isLoadingMostActive,
    isError: isErrorMostActive,
    isFetching: isFetchingMostActive,
  } = useQuery({
    queryKey: ['mostActives'],
    queryFn: fetchMostActives,
  });

  const {
    data: newsData,
    isLoading: isLoadingNews,
    isError: isErrorNews,
    isFetching: isFetchingNews,
  } = useQuery({
    queryKey: ['marketNews'],
    queryFn: fetchMarketNews,
  });

  const {
    data: gainersData,
    isLoading: isLoadingGainers,
  } = useQuery({
    queryKey: ['marketGainers'],
    queryFn: fetchMarketGainers,
    enabled: activeTab === 'gainers',
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: losersData,
    isLoading: isLoadingLosers,
  } = useQuery({
    queryKey: ['marketLosers'],
    queryFn: fetchMarketLosers,
    enabled: activeTab === 'losers',
    staleTime: 1000 * 60 * 5,
  });

  const isFetching = isFetchingIndices || isFetchingMostActive || isFetchingNews;

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Never';

  const handleForceSync = async () => {
    await queryClient.invalidateQueries({ queryKey: ['marketIndices'] });
    await queryClient.invalidateQueries({ queryKey: ['mostActives'] });
    await queryClient.invalidateQueries({ queryKey: ['marketNews'] });
  };

  return (
    <div className="min-h-screen bg-brandBackground transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition"
          >
            Back to Landing Page
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-slate-800 py-1.5 px-4 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">

              <span>Last updated: {lastUpdated}</span>
              <div className="w-px h-3 bg-gray-300 dark:bg-gray-600 mx-1" />
              <button
                onClick={handleForceSync}
                disabled={isFetching}
                className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold disabled:opacity-50 transition-colors"
              >
                <svg
                  className={`w-4 h-4 ${isFetching ? 'animate-spin text-gray-400' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {isFetching ? 'Syncing...' : 'Click to Sync latest data'}
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="text-4xl font-black text-blue-950 dark:text-white tracking-tight">
                Market Intelligence
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                Real-time signals. Professional grade analysis.
              </p>
            </div>
            <div className="max-w-xl">
              <SearchBar />
            </div>
          </div>
          {isLoadingIndices ? (
            <IndexSkeleton />  ) : isErrorIndices ? (
            <div className="lg:col-span-1 flex flex-col items-center justify-center gap-2 text-sm text-red-500 font-medium">
              <span>Failed to load indices.</span>
              <button
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ['marketIndices'] })
                }
                className="underline text-blue-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:col-span-1">
              {indicesData?.map((index) => (
                <IndexWidget key={index.symbol} index={index} />
              ))}
            </div>
          )}
        </div>
        <hr className="border-gray-100 dark:border-slate-800" />
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
            Global Market Pulse
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">
                Top Stories
              </h3>

              {isLoadingNews ? (
                <NewsSkeleton />
              ) : isErrorNews ? (
                <div className="text-sm text-red-500 font-medium flex items-center gap-2">
                  <span>Failed to load news.</span>
                  <button
                    onClick={() =>
                      queryClient.invalidateQueries({ queryKey: ['marketNews'] })
                    }
                    className="underline text-blue-600"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
                  {newsData?.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-1 sticky top-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="flex border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50">
                  {(['active', 'gainers', 'losers'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${
                        activeTab === tab
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-slate-800'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="p-2 min-h-[400px]">
                  {activeTab === 'active' && (
                    isLoadingMostActive ? (
                      <StockListSkeleton />  ) : isErrorMostActive ? (
                      <div className="text-center p-4 text-red-500 text-sm font-medium">
                        Failed to load.{' '}
                        <button
                          onClick={() =>
                            queryClient.invalidateQueries({ queryKey: ['mostActives'] })
                          }
                          className="underline text-blue-600"
                        >
                          Retry
                        </button>
                      </div>
                    ) : (
                      <StockListWidget title="" data={mostActiveData || []} />
                    )
                  )}
                  {activeTab === 'gainers' && (
                    isLoadingGainers ? (
                      <StockListSkeleton /> ) : (
                      <StockListWidget title="" data={gainersData || []} />
                    )
                  )}
                  {activeTab === 'losers' && (
                    isLoadingLosers ? (
                      <StockListSkeleton /> ) : (
                      <StockListWidget title="" data={losersData || []} />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;