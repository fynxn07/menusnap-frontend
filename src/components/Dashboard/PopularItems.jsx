import React from 'react';
import { MoreVertical } from 'lucide-react';

const PopularItems = () => {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-slate-900">Popular Items</h2>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-700">Classic Beef Burger</span>
            <span className="text-slate-500">92 orders</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: '90%', opacity: 1 }} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-700">Veggie Pizza</span>
            <span className="text-slate-500">65 orders</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: '65%', opacity: 0.8 }} />
          </div>
        </div>

        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-700">Pesto Pasta</span>
            <span className="text-slate-500">42 orders</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: '40%', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularItems;