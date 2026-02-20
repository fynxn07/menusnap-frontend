import React from 'react';

const OrderTrends = () => {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-slate-900">Order Trends</h2>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          Last 7 Days
        </span>
      </div>
      <div className="relative h-32 w-full mt-4">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path 
            d="M0 35 C 10 32, 20 15, 30 20 S 40 5, 50 15 S 70 30, 80 10 S 100 5, 100 5" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M0 35 C 10 32, 20 15, 30 20 S 40 5, 50 15 S 70 30, 80 10 S 100 5, 100 5 V 40 H 0 Z" 
            fill="url(#grad1)" 
            opacity="0.1"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-between mt-4 px-1">
        <span className="text-[10px] text-slate-400 font-bold">MON</span>
        <span className="text-[10px] text-slate-400 font-bold">WED</span>
        <span className="text-[10px] text-slate-400 font-bold">FRI</span>
        <span className="text-[10px] text-slate-400 font-bold">SUN</span>
      </div>
    </section>
  );
};

export default OrderTrends;