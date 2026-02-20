import React, { useState } from 'react';
import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/SideBar';
import StatsGrid from '../components/Dashboard/StatsGrid';
import QuickActions from '../components/Dashboard/QuickActions';
import LiveOrders from '../components/Dashboard/LiveOrders';
import PopularItems from '../components/Dashboard/PopularItems';
import OrderTrends from '../components/Dashboard/OrderTrends';

const Dashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState('Downtown Branch');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex overflow-hidden bg-slate-50">
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

 
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
 
        <Header selectedBranch={selectedBranch} setSidebarOpen={setSidebarOpen} />


        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">

          <section>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back,</h1>
            <p className="text-slate-500 font-medium">The Green Bistro Dashboard Overview</p>
          </section>

    
          <StatsGrid />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
      
              <QuickActions />

              <LiveOrders />
            </div>
            <div className="space-y-6">
              <PopularItems />
              <OrderTrends />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;