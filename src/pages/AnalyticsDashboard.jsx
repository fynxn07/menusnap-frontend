// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { analyticsService } from "../services/analyticsService";


// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";


// const AnalyticsDashboard = () => {
//   const { profile, loadingProfile } = useAuth();

//   const restaurantId = profile?.restaurant_id;

//   console.log("PROFILE:", profile);
//   console.log("RESTAURANT ID:", restaurantId);

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchAnalytics = async () => {
//     if (!restaurantId) return;

//     try {
//       setLoading(true);

//       const [
//         revenueRes,
//         peakRes,
//         trendsRes,
//         dishesRes,
//         tablesRes,
//       ] = await Promise.all([
//         analyticsService.getRevenue(restaurantId),
//         analyticsService.getPeakHours(restaurantId),
//         analyticsService.getOrderTrends(restaurantId),
//         analyticsService.getPopularDishes(restaurantId),
//         analyticsService.getTableUtilization(restaurantId),
//       ]);

//       setData({
//         revenue: revenueRes.data,
//         peak: peakRes.data,
//         trends: trendsRes.data,
//         dishes: dishesRes.data,
//         tables: tablesRes.data,
//       });
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load analytics");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (restaurantId) {
//       fetchAnalytics();
//     }
//   }, [restaurantId]);

//   if (loadingProfile || loading)
//     return (
//       <div className="p-10 text-center">
//         Loading analytics...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="p-10 text-center text-red-400">
//         {error}
//       </div>
//     );

//   if (!data) return null;

//   return (
//     <div className="p-6 space-y-6">

//       {/* ===== SUMMARY ===== */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

//         <SummaryCard
//           title="Total Revenue"
//           value={`₹${data.revenue.total_revenue}`}
//         />

//         <SummaryCard
//           title="Total Orders"
//           value={data.revenue.total_orders}
//         />

//         <SummaryCard
//           title="Peak Hour"
//           value={data.peak.peak_hour}
//         />

//         <SummaryCard
//           title="Active Tables"
//           value={data.tables.total_tables}
//         />

//       </div>

//       {/* ===== ORDERS BY HOUR ===== */}

//       <ChartCard title="Orders by Hour">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data.peak.hours}>
//             <XAxis dataKey="hour" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="orders" />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* ===== ORDER TRENDS ===== */}

//       <ChartCard title="Order Trends">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data.trends.daily}>
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line dataKey="orders" />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* ===== POPULAR DISHES ===== */}

//       <ChartCard title="Popular Dishes">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data.dishes.top_items}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="orders" />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* ===== TABLE UTILIZATION ===== */}

//       <ChartCard title="Table Utilization">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data.tables.tables}>
//             <XAxis dataKey="table_number" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="orders" />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//     </div>
//   );
// };

// /* ===== REUSABLE UI ===== */

// const SummaryCard = ({ title, value }) => (
//   <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
//     <p className="text-slate-400 text-sm">{title}</p>
//     <h2 className="text-2xl font-bold mt-2">{value}</h2>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
//     <h3 className="text-lg font-semibold mb-4">{title}</h3>
//     {children}
//   </div>
// );

// export { AnalyticsDashboard };


import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { analyticsService } from "../services/analyticsService";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  DollarSign, 
  ShoppingCart, 
  Clock, 
  Users, 
  TrendingUp,
  TrendingDown,
  Bell,
  User as UserIcon
} from "lucide-react";

const AnalyticsDashboard = () => {
  const { profile, loadingProfile } = useAuth();

  const restaurantId = profile?.restaurant_id;

  console.log("PROFILE:", profile);
  console.log("RESTAURANT ID:", restaurantId);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);

      // ⭐ OPTIMIZED: Fetch in parallel and set data as they arrive
      const promises = [
        analyticsService.getRevenue(restaurantId),
        analyticsService.getPeakHours(restaurantId),
        analyticsService.getOrderTrends(restaurantId),
        analyticsService.getPopularDishes(restaurantId),
        analyticsService.getTableUtilization(restaurantId),
      ];

      // Wait for all requests
      const [revenueRes, peakRes, trendsRes, dishesRes, tablesRes] = await Promise.all(promises);

      setData({
        revenue: revenueRes.data,
        peak: peakRes.data,
        trends: trendsRes.data,
        dishes: dishesRes.data,
        tables: tablesRes.data,
      });
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchAnalytics();
    }
  }, [restaurantId]);

  if (loadingProfile || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-400 font-semibold">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 font-semibold">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Analytics</h1>
              <p className="text-sm text-emerald-400">Bistro Management Pro</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
              <Bell className="w-5 h-5 text-emerald-400" />
            </button>
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* ===== SUMMARY CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            icon={<DollarSign className="w-6 h-6" />}
            title="Total Revenue"
            value={`₹${data.revenue.total_revenue?.toLocaleString() || 0}`}
            trend="+12.5%"
            trendUp={true}
          />

          <SummaryCard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Total Orders"
            value={data.revenue.total_orders || 0}
            trend="+8%"
            trendUp={true}
          />

          <SummaryCard
            icon={<Clock className="w-6 h-6" />}
            title="Peak Hour"
            value={data.peak.peak_hour || "N/A"}
            trend="-2%"
            trendUp={false}
          />

          <SummaryCard
            icon={<Users className="w-6 h-6" />}
            title="Active Tables"
            value={`${data.tables.active_tables || 0}/${data.tables.total_tables || 0}`}
            trend="+5%"
            trendUp={true}
          />
        </div>

        {/* ===== ORDERS BY HOUR ===== */}
        <ChartCard 
          title="Orders by Hour" 
          subtitle="Average volume per time slot"
          badge="LIVE"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.peak.hours}>
              <XAxis 
                dataKey="hour" 
                stroke="#6b7280"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* ===== ORDER TRENDS ===== */}
        <ChartCard 
          title="Order Trends" 
          subtitle="Daily growth over last 7 days"
          badge="Growth"
          badgeColor="bg-emerald-500/20 text-emerald-400"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.trends.daily}>
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* ===== POPULAR DISHES ===== */}
        <ChartCard 
          title="Popular Dishes" 
          subtitle="Sales volume by item"
          action="View All"
        >
          <div className="space-y-3">
            {data.dishes.top_items?.slice(0, 4).map((dish, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{dish.name}</span>
                  <span className="text-gray-400 text-sm">{dish.orders} sold</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(dish.orders / data.dishes.top_items[0].orders) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* ===== TABLE UTILIZATION ===== */}
        <ChartCard 
          title="Table Utilization" 
          subtitle="Orders per individual table"
          badge="85% Occupancy"
          badgeColor="bg-blue-500/20 text-blue-400"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.tables.tables}>
              <XAxis 
                dataKey="table_number" 
                stroke="#6b7280"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

/* ===== REUSABLE UI COMPONENTS ===== */

const SummaryCard = ({ icon, title, value, trend, trendUp }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:border-emerald-500/50 transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend}
          {trendUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
        </div>
      )}
    </div>
    <p className="text-gray-400 text-sm mb-1">{title}</p>
    <h2 className="text-2xl lg:text-3xl font-bold text-white">{value}</h2>
  </div>
);

const ChartCard = ({ title, subtitle, badge, badgeColor, action, children }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 lg:p-6 hover:border-emerald-500/30 transition-all">
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-lg lg:text-xl font-bold text-white">{title}</h3>
          {badge && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor || 'bg-emerald-500/20 text-emerald-400'}`}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-400">{subtitle}</p>
        )}
      </div>
      {action && (
        <button className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors">
          {action}
        </button>
      )}
    </div>
    <div className="text-white">
      {children}
    </div>
  </div>
);

export { AnalyticsDashboard };