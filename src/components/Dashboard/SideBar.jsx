import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Receipt,
  ChefHat,
  Users,
  BarChart3,
  CreditCard,
  LogOut,
  Utensils,
  User
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-64 bg-white border-r border-slate-200 flex flex-col
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 leading-tight">The Green Bistro</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider">
              Pro Plan
            </span>
          </div>
        </div>
      </div>

      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        
        <button
          onClick={() => handleNavigate('/')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/') || isActive('/dashboard')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <LayoutDashboard className={`w-5 h-5 ${(isActive('/') || isActive('/dashboard')) ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm">Dashboard</span>
        </button>

        
        <button
          onClick={() => handleNavigate('/menu')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/menu-management')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <BookOpen className={`w-5 h-5 ${isActive('/menu-management') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm">Menu Management</span>
        </button>

        <button
          onClick={() => handleNavigate('/admin_orders')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/order-management')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <Receipt className={`w-5 h-5 ${isActive('/admin_orders') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm">Order Management</span>
        </button>

        
        <button
          onClick={() => handleNavigate('/kitchen')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/kitchen')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <ChefHat className={`w-5 h-5 ${isActive('/kitchen') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm">Kitchen</span>
        </button>

        <button
          onClick={() => handleNavigate('/waiter')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/waiter')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <Users className={`w-5 h-5 ${isActive('/waiter') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm">Servants</span>
        </button>

        
        <button
          onClick={() => handleNavigate('/dashboard/analytics')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/analytics')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <BarChart3 className={`w-5 h-5 ${isActive('/analytics') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm">Analytics</span>
        </button>

        
        <div className="pt-4 pb-2">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Settings
          </p>
        </div>

        
        <button
          onClick={() => handleNavigate('/profile')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/profile')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <User className={`w-5 h-5 ${isActive('/profile') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm font-medium">Profile</span>
        </button>

        <button
          onClick={() => handleNavigate('/subscription')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
            ${isActive('/subscription')
              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
              : 'text-slate-600 hover:bg-slate-50 font-medium'
            }
          `}
        >
          <CreditCard className={`w-5 h-5 ${isActive('/subscription') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-sm font-medium">Subscription & Billing</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={() => handleNavigate('/login')}
          className="flex items-center gap-3 w-full px-3 py-2 text-slate-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;