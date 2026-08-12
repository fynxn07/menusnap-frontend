import React from 'react';
import { ShoppingCart, DollarSign, UtensilsCrossed, Clock } from 'lucide-react';

const Card = ({ icon, iconBg, label, value, badge, badgeColor, loading }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
      {badge && (
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${badgeColor}`}>
          {badge}
        </span>
      )}
    </div>
    <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
      {label}
    </p>
    {loading ? (
      <div className="h-8 w-16 bg-slate-100 rounded animate-pulse" />
    ) : (
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    )}
  </div>
);

const StatsGrid = ({ stats, loading }) => {
  const s = stats || {};

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <Card
        icon={<ShoppingCart className="w-5 h-5" />}
        iconBg="bg-blue-50 text-blue-600"
        label="Today's Orders"
        value={s.todaysOrdersCount ?? 0}
        loading={loading}
      />

      <Card
        icon={<DollarSign className="w-5 h-5" />}
        iconBg="bg-emerald-50 text-emerald-600"
        label="Today's Revenue"
        value={`₹${(s.revenueToday ?? 0).toLocaleString()}`}
        loading={loading}
      />

      <Card
        icon={<UtensilsCrossed className="w-5 h-5" />}
        iconBg="bg-amber-50 text-amber-600"
        label="Active Tables"
        value={`${s.activeTables ?? 0}/${s.totalTables ?? 0}`}
        loading={loading}
      />

      <Card
        icon={<Clock className="w-5 h-5" />}
        iconBg="bg-red-50 text-red-600"
        label="Pending Orders"
        value={s.pendingOrdersCount ?? 0}
        badge={s.pendingOrdersCount > 0 ? 'Urgent' : undefined}
        badgeColor="text-red-600 bg-red-50"
        loading={loading}
      />
    </section>
  );
};

export default StatsGrid;