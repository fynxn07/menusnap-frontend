const StatsBar = ({ stats }) => {
  if (!stats) return null;

  const percent = (stats.total_items / stats.limit) * 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">Free Plan</p>
        <p className="text-sm text-gray-600">
          {stats.total_items} of {stats.limit} items used
        </p>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      
      <p className="text-xs text-emerald-500 font-medium">
        Upgrade for unlimited items
      </p>
    </div>
  );
};

export default StatsBar;