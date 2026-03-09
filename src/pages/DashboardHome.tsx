import { useState } from 'react';
import SearchBar from '../components/UI/SearchBar';
import StockListWidget from '../components/Dashboard/StockListWidget';
import NewsCard from '../components/Dashboard/NewsCard'; 
import IndexWidget from '../components/Dashboard/IndexWidget';
import { mockMostActive, mockDayGainers, mockDayLosers, mockMarketIndices } from '../MOCKDATA/mockMarket';
import { mockNewsArticles } from '../MOCKDATA/mockNews';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/UI/ThemeToggle';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  
  return (
    <div className="min-h-screen bg-brandBackground transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/LandingPage')}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition"
          >
             Back to Landing Page
          </button>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="text-4xl font-black text-blue-950 dark:text-white tracking-tight">
                Market Intelligence
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                Real-time signals. Professional-grade analysis.
              </p>
            </div>
            <div className="max-w-xl">
              <SearchBar />
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest font-bold">Trending: AAPL, NVDA, TSLA</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:col-span-1">
             {mockMarketIndices.map(index => (
               <IndexWidget key={index.symbol} index={index} />
             ))}
          </div>
        </div>

        <hr className="border-gray-100 dark:border-slate-800" />

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-950 dark:text-white">Global Market Pulse</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-end">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Top Stories</h3>
                <span className="text-xs text-blue-600 font-bold cursor-pointer">View All</span>
              </div>
              <div className="space-y-4 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar"> 
                {mockNewsArticles.map(article => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 sticky top-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="flex border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50">
                  <button 
                    onClick={() => setActiveTab('active')}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-slate-800' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Active
                  </button>
                  <button 
                    onClick={() => setActiveTab('gainers')}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'gainers' ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-slate-800' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Gainers
                  </button>
                  <button 
                    onClick={() => setActiveTab('losers')}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'losers' ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-slate-800' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Losers
                  </button>
                </div>

                <div className="p-2">
                  {activeTab === 'active' && <StockListWidget title="" data={mockMostActive} />}
                  {activeTab === 'gainers' && <StockListWidget title="" data={mockDayGainers} />}
                  {activeTab === 'losers' && <StockListWidget title="" data={mockDayLosers} />}
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