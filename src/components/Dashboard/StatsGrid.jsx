import React from 'react';
import { ShoppingCart, DollarSign, UtensilsCrossed, Clock } from 'lucide-react';

const StatsGrid = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            +12%
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
          Today's Orders
        </p>
        <p className="text-3xl font-bold text-slate-900">42</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            +5%
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
          Total Revenue
        </p>
        <p className="text-3xl font-bold text-slate-900">$1,240</p>
      </div>

      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
            80%
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
          Active Tables
        </p>
        <p className="text-3xl font-bold text-slate-900">12</p>
      </div>

      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
            Urgent
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
          Pending Orders
        </p>
        <p className="text-3xl font-bold text-slate-900">5</p>
      </div>
    </section>
  );
};

export default StatsGrid;