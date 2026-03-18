import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/UI/ThemeToggle';
import type { NewsArticle } from '../types';

const NewsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article as NewsArticle;

  if (!article) {
    return (
      <div className="min-h-screen bg-brandBackground flex flex-col items-center justify-center gap-4">
        <div className="text-gray-500 font-bold">Article data lost on refresh.</div>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBackground transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)} 
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="w-full h-64 md:h-96 bg-gray-100 dark:bg-slate-900">
            <img 
              src={article.thumbnail} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-10 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-md">
                {article.publisher}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {article.pubDate}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-blue-950 dark:text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {article.description}
            </p>

            <div className="pt-8 mt-4 border-t border-gray-100 dark:border-slate-700">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm"
              >
                Read Full Story on {article.publisher}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsDetails;