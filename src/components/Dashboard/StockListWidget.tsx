import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { StockListWidgetProps } from '../../types';

const StockListWidget: React.FC<StockListWidgetProps> = ({ title, data, isTabbed }) => { 
  const navigate = useNavigate();

  return (
    <div className={`transition-colors duration-300 flex flex-col h-full ${
      !isTabbed 
        ? 'bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6' 
        : 'p-2'
    }`}>
      {title && <h3 className="font-bold text-blue-950 dark:text-white mb-4">{title}</h3>}
      
      <div className="space-y-1">
        {data.map((stock) => {
          const isPositive = stock.changePercent >= 0;
          
          return (
            <div 
              key={stock.symbol} 
              onClick={() => navigate(`/stock/${stock.symbol}`)}
              className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-xl cursor-pointer transition-colors group"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                  {stock.symbol}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-medium">
                  {stock.name || stock.companyName}
                </span>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-gray-200">
                  ${stock.price.toFixed(2)}
                </div>                
                <div className={`text-xs font-bold flex items-center justify-end gap-1 ${
                  isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {isPositive ? '▲' : '▼'} {Math.abs(stock.changePercent)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockListWidget;