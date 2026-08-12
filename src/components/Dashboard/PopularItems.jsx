import React from 'react';
import { MoreVertical } from 'lucide-react';

const PopularItems = ({ items = [], loading }) => {
  const max = items.length ? Math.max(...items.map((i) => i.orders)) : 0;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-slate-900">Popular Items</h2>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {loading && <p className="text-sm text-slate-400">Loading…</p>}

      {!loading && items.length === 0 && (
        <p className="text-sm text-slate-400">
          No sales data yet. This fills in once orders come through.
        </p>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">{item.name}</span>
              <span className="text-slate-500">{item.orders} orders</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${max ? (item.orders / max) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularItems;