import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// A local list of popular stocks. This costs ZERO API calls to search through!
// You can expand this list later, or put it in a separate file like 'utils/stockList.ts'
const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'BAC', name: 'Bank of America' },
  { symbol: 'DIS', name: 'Walt Disney Co.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' }
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const filteredResults = POPULAR_STOCKS.filter(
    (stock) => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
      stock.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/stock/${query.toUpperCase().trim()}`);
      setQuery(''); 
    }
  };

  const handleSelect = (symbol: string) => {
    setShowDropdown(false);
    navigate(`/stock/${symbol}`);
    setQuery(''); 
  };

  return (
    <form ref={wrapperRef} onSubmit={handleSearch} className="w-full max-w-xl relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      <input 
        type="text" 
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search by ticker symbol (e.g., AAPL)"
        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm relative z-10"
      />

      {showDropdown && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden">
          {filteredResults.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {filteredResults.map((result) => (
                <li 
                  key={result.symbol}
                  onClick={() => handleSelect(result.symbol)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border-b border-gray-50 dark:border-slate-700/50 last:border-0 flex justify-between items-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white">
                    {result.symbol}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate ml-4 text-right">
                    {result.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Press Enter to search for "{query.toUpperCase()}"
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;