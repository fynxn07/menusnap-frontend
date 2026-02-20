import React from 'react';
import { MapPin, ChevronDown, Bell, Menu } from 'lucide-react';

const Header = ({ selectedBranch, setSidebarOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(prev => !prev)}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        {/* Branch Selector */}
        <div className="relative">
          <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700 hidden sm:inline">
              {selectedBranch}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
        
        <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <img 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-slate-200 object-cover" 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          />
          <div className="text-left hidden md:block">
            <p className="text-xs font-bold text-slate-900 leading-none">Alex Johnson</p>
            <p className="text-[10px] text-slate-500 font-medium">Super Admin</p>
          </div>
        </button>
        
      </div>
    </header>
  );
};

export default Header;