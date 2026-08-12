import React from 'react';

const OrderTrends = ({ trend = [], loading }) => {
  const max = Math.max(1, ...trend.map((d) => d.orders));

  // Map each day to an SVG point, y inverted (0 = top)
  const points = trend.map((d, i) => {
    const x = trend.length > 1 ? (i / (trend.length - 1)) * 100 : 0;
    const y = 38 - (d.orders / max) * 34;
    return `${x},${y}`;
  });

  const linePath = points.length ? `M ${points.join(' L ')}` : '';
  const areaPath = points.length ? `${linePath} L 100,40 L 0,40 Z` : '';

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-slate-900">Order Trends</h2>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          Last 7 Days
        </span>
      </div>

      {loading ? (
        <div className="h-32 w-full bg-slate-50 rounded animate-pulse" />
      ) : (
        <div className="relative h-32 w-full mt-4">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
            {areaPath && <path d={areaPath} fill="url(#grad1)" opacity="0.15" />}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            )}
            <defs>
              <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      <div className="flex justify-between mt-4 px-1">
        {trend.map((d, i) => (
          <span key={i} className="text-[10px] text-slate-400 font-bold">
            {d.label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default OrderTrends;