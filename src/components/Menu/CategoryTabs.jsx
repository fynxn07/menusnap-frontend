const CategoryTabs = ({ categories, active, setActive, onAddCategory }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Categories</h3>
        <button 
          onClick={onAddCategory}
          className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
          title="Add Category"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`
              px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all flex-shrink-0
              ${active === cat.id
                ? "text-gray-900 border-b-2 border-emerald-500"
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {cat.name}
            {cat.count !== undefined && (
              <span className="ml-2 text-xs opacity-70">{cat.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;