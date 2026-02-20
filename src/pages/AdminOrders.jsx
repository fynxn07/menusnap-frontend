// import { useEffect, useState } from "react";
// import { getAdminOrders } from "../services/orderApi";
// import { useNavigate } from "react-router-dom";

// const TABS = [
//   { label: "All Orders", value: "ALL" },
//   { label: "New", value: "PLACED" },
//   { label: "Preparing", value: "PREPARING" },
//   { label: "Ready", value: "READY" },
//   { label: "Served", value: "SERVED" },
// ];

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState("ALL");
//   const [loading, setLoading] = useState(false);
//   const navigate=useNavigate()

//   // ✅ Fetch using your service
//   const fetchOrders = async (status) => {
//     try {
//       setLoading(true);

//       const res = await getAdminOrders(status);
//       setOrders(res.data);

//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(activeTab);
//   }, [activeTab]);

//   const handleViewDetails = (id) => {
//     navigate(`/admin_orders/${id}`)
//   };

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">

//       {/* Title */}
//       <h1 className="text-2xl font-bold mb-4">
//         Manage customer orders
//       </h1>

//       {/* Tabs */}
//       <div className="flex space-x-2 overflow-x-auto mb-5">
//         {TABS.map((tab) => (
//           <button
//             key={tab.value}
//             onClick={() => setActiveTab(tab.value)}
//             className={`px-4 py-2 rounded-full text-sm font-medium ${
//               activeTab === tab.value
//                 ? "bg-green-500 text-white"
//                 : "bg-white shadow"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Loading */}
//       {loading && <p>Loading orders...</p>}

//       {/* Empty */}
//       {!loading && orders.length === 0 && (
//         <p>No orders found</p>
//       )}

//       {/* Orders */}
//       {!loading &&
//         orders.map((order) => (
//           <div
//             key={order.id}
//             className="bg-white rounded-2xl shadow p-4 mb-4"
//           >

//             {/* Header */}
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-gray-400 text-sm">
//                   ORDER #{order.id}
//                 </p>
//                 <p className="text-gray-700">
//                   Table {order.table_number}
//                 </p>
//               </div>

//               <span className="px-3 py-1 rounded-full text-sm bg-gray-200">
//                 {order.status}
//               </span>
//             </div>

//             {/* Items Preview */}
//             <div className="mt-3 text-gray-600">
//               {order.items_preview?.map((item, i) => (
//                 <p key={i}>
//                   {item.quantity}x {item.name}
//                 </p>
//               ))}
//             </div>

//             {/* Amount & Time */}
//             <div className="flex justify-between mt-3 text-sm text-gray-500">
//               <p>${order.total_amount}</p>
//               <p>
//                 {new Date(order.created_at).toLocaleTimeString()}
//               </p>
//             </div>

//             {/* Button */}
//             <button
//               onClick={() => handleViewDetails(order.id)}
//               className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg"
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default AdminOrders;


import { useEffect, useState } from "react";
import { getAdminOrders } from "../services/orderApi";
import { useNavigate } from "react-router-dom";
import { Menu, User, Calendar, Filter, UtensilsCrossed, BarChart3, Settings } from "lucide-react";

const TABS = [
    { label: "All Orders", value: "ALL" },
    { label: "New", value: "PLACED" },
    { label: "Preparing", value: "PREPARING" },
    { label: "Ready", value: "READY" },
    { label: "Served", value: "SERVED" },
];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("ALL");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch using your service
    const fetchOrders = async (status) => {
        try {
            setLoading(true);
            const res = await getAdminOrders(status);
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(activeTab);
    }, [activeTab]);

    const handleViewDetails = (id) => {
        navigate(`/admin_orders/${id}`);
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "PLACED":
                return "bg-blue-100 text-blue-700";
            case "PREPARING":
                return "bg-orange-100 text-orange-700";
            case "READY":
                return "bg-emerald-100 text-emerald-700";
            case "SERVED":
                return "bg-gray-100 text-gray-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Get status label
    const getStatusLabel = (status) => {
        switch (status) {
            case "PLACED":
                return "NEW";
            case "PREPARING":
                return "PREPARING";
            case "READY":
                return "READY";
            case "SERVED":
                return "SERVED";
            default:
                return status;
        }
    };

    // Format time ago
    const getTimeAgo = (date) => {
        const now = new Date();
        const orderDate = new Date(date);
        const diffMs = now - orderDate;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "Just now";
        if (diffMins === 1) return "1 min ago";
        if (diffMins < 60) return `${diffMins} mins ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours === 1) return "1 hour ago";
        if (diffHours < 24) return `${diffHours} hours ago`;

        return orderDate.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white sticky top-0 z-40 shadow-sm">
                <div className="px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h1 className="text-xl font-bold text-gray-900">Orders</h1>

                    <button className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-600" />
                    </button>
                </div>
            </div>

            {/* Title & Live Updates */}
            <div className="px-4 pt-6 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Manage customer orders
                </h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                        Live Updates Enabled
                    </span>
                </div>
            </div>

            {/* Date & Filter Buttons
      <div className="px-4 pb-4 flex gap-3">
        <button className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:border-emerald-500 transition-colors">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Today</span>
        </button>
        
        <button className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:border-emerald-500 transition-colors">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Filters</span>
        </button>
      </div> */}

            {/* Tabs */}
            <div className="px-4 pb-4">
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-3 pb-2">
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`
                  whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0
                  ${activeTab === tab.value
                                        ? "text-gray-900 border-b-2 border-emerald-500"
                                        : "text-gray-500 hover:text-gray-700"
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="px-4 space-y-4">
                {/* Loading */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                        <p className="text-gray-500 mt-4">Loading orders...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && orders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UtensilsCrossed className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg font-semibold">No orders found</p>
                        <p className="text-gray-400 text-sm mt-1">Orders will appear here when customers place them</p>
                    </div>
                )}

                {/* Orders */}
                {!loading && orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                                    Order #{order.id}
                                </p>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <UtensilsCrossed className="w-4 h-4" />
                                    <span className="font-semibold">Table {order.table_number}</span>
                                </div>
                            </div>

                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                                {getStatusLabel(order.status)}
                            </span>
                        </div>

                        {/* Items Preview */}
                        <div className="mb-4 text-gray-600 text-sm">
                            {order.items_preview?.map((item, i) => (
                                <span key={i}>
                                    {item.quantity}x {item.name}
                                    {i < order.items_preview.length - 1 && ", "}
                                </span>
                            ))}
                        </div>

                        {/* Amount & Time */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount</p>
                                <p className="text-lg font-bold text-gray-900">${order.total_amount}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Time</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {getTimeAgo(order.created_at)}
                                </p>
                            </div>
                        </div>

                        {/* View Details Button */}
                        <button
                            onClick={() => handleViewDetails(order.id)}
                            className={`
                w-full py-3.5 rounded-xl font-bold transition-all
                ${order.status === "PLACED"
                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                                    : "bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                                }
              `}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
                <div className="flex justify-around items-center max-w-screen-xl mx-auto">
                    <button className="flex flex-col items-center gap-1 text-emerald-500">
                        <UtensilsCrossed className="w-6 h-6" />
                        <span className="text-xs font-semibold">Orders</span>
                    </button>

                    <button
                        onClick={() => navigate("/menu")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                        <span className="text-xs">Menu</span>
                    </button>

                    <button className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center -mt-6 shadow-lg shadow-emerald-500/30 transition-colors">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>

                    <button
                        onClick={() => navigate("/analytics")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <BarChart3 className="w-6 h-6" />
                        <span className="text-xs">Sales</span>
                    </button>

                    <button
                        onClick={() => navigate("/settings")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <Settings className="w-6 h-6" />
                        <span className="text-xs">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;