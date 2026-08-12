import React from 'react';
import { useNavigate } from 'react-router-dom';

const STATUS_STYLES = {
  PLACED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-amber-100 text-amber-700',
  READY: 'bg-emerald-100 text-emerald-700',
  SERVED: 'bg-slate-100 text-slate-600',
  CANCELLED: 'bg-red-100 text-red-700',
};

const NEXT_ACTION = {
  PLACED: { label: 'Start Preparing', next: 'PREPARING' },
  PREPARING: { label: 'Mark Ready', next: 'READY' },
  READY: { label: 'Mark Delivered', next: 'SERVED' },
};

const timeAgo = (iso) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(0, Math.round(diffMs / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hrs = Math.round(mins / 60);
  return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
};

const OrderRow = ({ order, onUpdateStatus }) => {
  const action = NEXT_ACTION[order.status];
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-900">#{order.id}</span>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[order.status] || 'bg-slate-100 text-slate-600'}`}>
          {order.status}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 font-medium">Table #{order.table_number}</span>
        <span className="text-slate-500">{timeAgo(order.created_at)}</span>
      </div>
      {action && (
        <button
          onClick={() => onUpdateStatus(order.id, action.next)}
          className="w-full text-center py-2 text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase border border-slate-200 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          {action.label}
        </button>
      )}
    </>
  );
};

const LiveOrders = ({ orders = [], loading, onUpdateStatus }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 lg:p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Live Orders</h2>
        <button
          onClick={() => navigate('/admin_orders')}
          className="text-sm font-bold text-emerald-500 hover:underline"
        >
          View All Orders
        </button>
      </div>

      {loading && (
        <div className="p-6 text-sm text-slate-400">Loading orders…</div>
      )}

      {!loading && orders.length === 0 && (
        <div className="p-6 text-sm text-slate-400">No active orders right now.</div>
      )}

      {!loading && orders.length > 0 && (
        <>
          {/* Mobile View */}
          <div className="lg:hidden divide-y divide-slate-100">
            {orders.map((order) => (
              <div key={order.id} className="p-4 space-y-3">
                <OrderRow order={order} onUpdateStatus={onUpdateStatus} />
              </div>
            ))}
          </div>

          {/* Desktop View */}
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
                {orders.map((order) => {
                  const action = NEXT_ACTION[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">#{order.id}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">Table #{order.table_number}</td>
                      <td className="px-6 py-4 text-slate-500">{timeAgo(order.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[order.status] || 'bg-slate-100 text-slate-600'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {action && (
                          <button
                            onClick={() => onUpdateStatus(order.id, action.next)}
                            className="text-emerald-500 hover:text-emerald-600 font-bold text-xs uppercase"
                          >
                            {action.label}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default LiveOrders;