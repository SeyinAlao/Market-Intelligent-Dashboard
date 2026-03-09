import  type { MarketIndex } from '../../types';

export const IndexWidget = ({ index }: { index: MarketIndex }) => {
  const isPositive = index.change >= 0;
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase">{index.name}</p>
        <p className="text-lg font-bold dark:text-white">{index.price.toLocaleString()}</p>
      </div>
      <div className={`text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <p className="font-bold">{isPositive ? '+' : ''}{index.changePercent}%</p>
        <p className="text-xs opacity-80">{isPositive ? '▲' : '▼'} {index.change}</p>
      </div>
    </div>
  );
};

export default IndexWidget;