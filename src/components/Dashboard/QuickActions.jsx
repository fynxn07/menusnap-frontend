import React from 'react';
import { PlusCircle, FileText, QrCode, UserPlus } from 'lucide-react';

const QuickActions = () => {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <button className="p-4 rounded-xl flex flex-col items-center gap-3 transition-all bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-xl">
          <PlusCircle className="w-6 h-6" />
          <span className="text-xs font-bold">Add Item</span>
        </button>

        
        <button className="p-4 rounded-xl flex flex-col items-center gap-3 transition-all bg-white border border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50">
          <FileText className="w-6 h-6 text-emerald-500" />
          <span className="text-xs font-bold text-slate-700">View Menu</span>
        </button>

        
        <button className="p-4 rounded-xl flex flex-col items-center gap-3 transition-all bg-white border border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50">
          <QrCode className="w-6 h-6 text-emerald-500" />
          <span className="text-xs font-bold text-slate-700">Generate QR</span>
        </button>

        
        <button className="p-4 rounded-xl flex flex-col items-center gap-3 transition-all bg-white border border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50">
          <UserPlus className="w-6 h-6 text-emerald-500" />
          <span className="text-xs font-bold text-slate-700">Add Staff</span>
        </button>
      </div>
    </section>
  );
};

export default QuickActions;