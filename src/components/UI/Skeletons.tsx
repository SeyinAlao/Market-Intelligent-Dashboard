export const IndexSkeleton = () => (
  <div className="grid grid-cols-1 gap-3 lg:col-span-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-16 rounded-xl bg-gray-100 dark:bg-slate-700 animate-pulse"
      />
    ))}
  </div>
);

export const NewsSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="h-24 rounded-xl bg-gray-100 dark:bg-slate-700 animate-pulse"
      />
    ))}
  </div>
);

export const StockListSkeleton = () => (
  <div className="space-y-3 p-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="h-10 rounded-lg bg-gray-100 dark:bg-slate-700 animate-pulse"
      />
    ))}
  </div>
);