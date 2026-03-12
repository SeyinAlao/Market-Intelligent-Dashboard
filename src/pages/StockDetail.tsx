import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPerformanceData } from '../MOCKDATA/mockStocks'; 
import { useStockProfile } from '../hooks/useStockProfile'; 
import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, 
  BarChart, Bar, Legend, Tooltip
} from 'recharts';

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { stock, isLoading, error } = useStockProfile(symbol);
  const [timeframe, setTimeframe] = useState<'1M' | '6M' | '1Y'>('6M');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-slate-500 font-medium animate-pulse text-lg">Loading market data...</div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <div className="text-slate-800 font-bold text-xl">{error || "Stock Not Found"}</div>
        <button onClick={() => navigate(-1)} className="text-blue-600 font-medium hover:underline mt-2">
          Return To Dashboard
        </button>
      </div>
    );
  }
  const isPositive = stock.changePercent >= 0;
  const totalAnalysts = stock.recommendationTrends 
    ? stock.recommendationTrends.buy + stock.recommendationTrends.hold + stock.recommendationTrends.sell + stock.recommendationTrends.strongBuy + stock.recommendationTrends.strongSell
    : 0;

  const sentimentData = stock.recommendationTrends ? [
    { name: 'Buy', value: stock.recommendationTrends.buy + stock.recommendationTrends.strongBuy },
    { name: 'Hold', value: stock.recommendationTrends.hold },
    { name: 'Sell', value: stock.recommendationTrends.sell + stock.recommendationTrends.strongSell },
  ] : [];
  const getChartData = () => {
    if (timeframe === '1M') return mockPerformanceData.slice(-5);
    if (timeframe === '6M') return mockPerformanceData.slice(-15);
    if (timeframe === '1Y') return mockPerformanceData.slice(-30);
    return mockPerformanceData;
  };
  const activeChartData = getChartData();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-medium hover:text-slate-600 transition-colors mb-4">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{stock.symbol}</h1>
            <p className="text-slate-400 text-lg">{stock.name}</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <h2 className="text-5xl font-medium text-slate-900">${stock.price.toFixed(2)}</h2>
            <div className={`flex items-center justify-end gap-1 text-lg font-medium mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {isPositive ? '+' : ''}{stock.changeAmount > 0 ? stock.changeAmount.toFixed(2) : stock.changeAmount} ({isPositive ? '+' : ''}{stock.changePercent}%)
            </div>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Price Snapshot</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <SnapshotItem label="Market Cap" value={stock.marketCap} />
            <SnapshotItem label="P/E Ratio" value={stock.peRatio} />
            <SnapshotItem label="52W High" value={stock.high !== 'N/A' ? `$${stock.high}` : 'N/A'} />
            <SnapshotItem label="52W Low" value={stock.low !== 'N/A' ? `$${stock.low}` : 'N/A'} />
            <SnapshotItem label="Volume" value={typeof stock.volume === 'number' ? stock.volume.toLocaleString() : String(stock.volume)} />
            <SnapshotItem label="Avg Volume" value={typeof stock.avgVolume === 'number' ? stock.avgVolume.toLocaleString() : stock.avgVolume} />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-semibold text-slate-800">Performance</h3>
            <div className="flex bg-slate-50 rounded-lg p-1 space-x-1">
              {(['1M', '6M', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    timeframe === tf
                      ? 'text-white bg-[#1e293b] shadow'
                      : 'text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeChartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Line type="monotone" dataKey="price" stroke="#1e293b" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#1e293b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Financial Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FinancialBox label="Revenue" value={stock.financials?.totalRevenue || 'N/A'} trend={stock.financials?.revenueGrowth} />
            <FinancialBox label="Net Income" value="N/A" /> 
            <FinancialBox label="EBITDA" value={stock.financials?.ebitda || 'N/A'} />
            <FinancialBox label="Profit Margin" value={stock.financials?.profitMargin || 'N/A'} />
            <FinancialBox label="Total Cash" value={stock.financials?.totalCash || 'N/A'} /> 
            <FinancialBox label="Total Debt" value={stock.financials?.totalDebt || 'N/A'} /> 
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          <div className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Earnings Summary</h3>
            {stock.earnings?.history ? (
              <div className="flex-grow h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stock.earnings.history} barGap={0}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                    <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b', paddingTop: '20px' }} />
                    <Bar dataKey="actual" name="Actual Earning Per Share" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar dataKey="estimate" name="Estimate" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center text-slate-400 text-sm">No Earnings Data Available</div>
            )}
          </div>
          <div className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-8">Analyst Sentiment</h3>
              {sentimentData.length > 0 ? (
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sentimentData} layout="vertical" margin={{ left: -10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide={false} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickCount={5} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={50} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                      <Bar dataKey="value" fill="#4ade80" radius={[0, 4, 4, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center text-slate-400 text-sm h-[200px]">No Sentiment Data Available</div>
              )}
            </div>
            <div className="mt-6 bg-[#f8f9fa] rounded-xl p-5 border border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Total Analysts</p>
              <p className="text-2xl font-bold text-slate-800">{totalAnalysts}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const SnapshotItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-[15px] font-medium text-slate-800">{value}</span>
  </div>
);

const FinancialBox = ({ label, value, trend }: { label: string; value: string | number; trend?: string }) => {
  const isPositiveTrend = trend?.startsWith('+') || parseFloat(trend || '0') > 0;
  
  return (
    <div className="bg-[#f8f9fa] rounded-xl p-5 border border-slate-100 flex flex-col justify-between h-24">
      <div className="flex justify-between items-start">
        <span className="text-sm text-slate-500">{label}</span>
        {trend && (
          <span className={`text-xs font-medium ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
            {isPositiveTrend && !trend.startsWith('+') ? '+' : ''}{trend}
          </span>
        )}
      </div>
      <span className="text-xl font-bold text-slate-800">{value}</span>
    </div>
  );
};

export default StockDetail;