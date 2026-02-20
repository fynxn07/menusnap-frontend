import React from 'react';

const LiveOrders = () => {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 lg:p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Live Orders</h2>
        <button className="text-sm font-bold text-emerald-500 hover:underline">
          View All Orders
        </button>
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden divide-y divide-slate-100">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">#842</span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
              Preparing
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Table #04</span>
            <span className="text-slate-500">2 mins ago</span>
          </div>
          <button className="w-full text-center py-2 text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase border border-slate-200 rounded-lg hover:bg-emerald-50 transition-colors">
            Mark Ready
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">#841</span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
              Ready
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Table #12</span>
            <span className="text-slate-500">8 mins ago</span>
          </div>
          <button className="w-full text-center py-2 text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase border border-slate-200 rounded-lg hover:bg-emerald-50 transition-colors">
            Mark Delivered
          </button>
        </div>

        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">#840</span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
              Ready
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Table #07</span>
            <span className="text-slate-500">15 mins ago</span>
          </div>
          <button className="w-full text-center py-2 text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase border border-slate-200 rounded-lg hover:bg-emerald-50 transition-colors">
            Mark Delivered
          </button>
        </div>
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-500 text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-bold">Order ID</th>
              <th className="px-6 py-3 font-bold">Table</th>
              <th className="px-6 py-3 font-bold">Time</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">#842</td>
              <td className="px-6 py-4 text-slate-600 font-medium">Table #04</td>
              <td className="px-6 py-4 text-slate-500">2 mins ago</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                  Preparing
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase">
                  Mark Ready
                </button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">#841</td>
              <td className="px-6 py-4 text-slate-600 font-medium">Table #12</td>
              <td className="px-6 py-4 text-slate-500">8 mins ago</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  Ready
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase">
                  Mark Delivered
                </button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">#840</td>
              <td className="px-6 py-4 text-slate-600 font-medium">Table #07</td>
              <td className="px-6 py-4 text-slate-500">15 mins ago</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  Ready
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase">
                  Mark Delivered
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LiveOrders;