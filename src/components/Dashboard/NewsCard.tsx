import type { NewsArticle } from '../../types';

const NewsCard = ({ article }: { article: NewsArticle }) => {
  return (
    <div className="group flex gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-pointer">
      <div className="w-24 h-24 md:w-32 md:h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <img 
          src={article.thumbnail} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400">
              {article.publisher}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">{article.pubDate}</span>
          </div>
          <h4 className="text-md font-bold text-blue-950 dark:text-white leading-tight line-clamp-2">
            {article.title}
          </h4>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
          {article.description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;