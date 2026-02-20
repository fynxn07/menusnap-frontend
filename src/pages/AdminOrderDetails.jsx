// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getAdminOrderDetail } from "../services/orderApi";

// const AdminOrderDetails = () => {
//   const { id } = useParams();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchOrder = async () => {
//     try {
//       setLoading(true);

//       const res = await getAdminOrderDetail(id);
//       setOrder(res.data);

//     } catch (err) {
//       console.error("Error fetching order:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, [id]);

//   if (loading) return <p className="p-4">Loading order...</p>;

//   if (!order) return <p className="p-4">Order not found</p>;

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">

//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-4">
//         Order Details
//       </h1>

//       {/* Order Info Card */}
//       <div className="bg-white rounded-2xl shadow p-4 mb-5">

//         <div className="flex justify-between mb-2">
//           <p className="text-gray-500">Order ID</p>
//           <p className="font-medium">#{order.id}</p>
//         </div>

//         <div className="flex justify-between mb-2">
//           <p className="text-gray-500">Restaurant</p>
//           <p>{order.restaurant_name}</p>
//         </div>

//         <div className="flex justify-between mb-2">
//           <p className="text-gray-500">Table</p>
//           <p>Table {order.table_number}</p>
//         </div>

//         <div className="flex justify-between mb-2">
//           <p className="text-gray-500">Status</p>
//           <span className="px-3 py-1 rounded-full bg-gray-200">
//             {order.status}
//           </span>
//         </div>

//         <div className="flex justify-between mb-2">
//           <p className="text-gray-500">Time</p>
//           <p>
//             {new Date(order.created_at).toLocaleString()}
//           </p>
//         </div>

//         <div className="flex justify-between font-semibold mt-3">
//           <p>Total</p>
//           <p>${order.total_amount}</p>
//         </div>

//       </div>

//       {/* Items List */}
//       <h2 className="text-xl font-semibold mb-3">
//         Items
//       </h2>

//       {order.items.map((item) => (
//         <div
//           key={item.id}
//           className="bg-white rounded-xl shadow p-4 mb-3"
//         >

//           <div className="flex justify-between">
//             <p className="font-medium">
//               {item.menu_item.name}
//             </p>
//             <p>x{item.quantity}</p>
//           </div>

//           <div className="flex justify-between text-gray-500 mt-1">
//             <p>${item.price}</p>
//             <p>
//               ${(item.price * item.quantity).toFixed(2)}
//             </p>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminOrderDetails;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminOrderDetail } from "../services/orderApi";
import { ArrowLeft, Clock, MapPin, User, CreditCard, Check, X, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await getAdminOrderDetail(id);
      setOrder(res.data);
    } catch (err) {
      console.error("Error fetching order:", err);
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-500";
      case "PREPARING":
        return "bg-orange-500";
      case "READY":
        return "bg-emerald-500";
      case "SERVED":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case "PLACED":
        return "New Order";
      case "PREPARING":
        return "Preparing";
      case "READY":
        return "Ready to Serve";
      case "SERVED":
        return "Served";
      default:
        return status;
    }
  };

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get time ago
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-gray-900 font-bold text-xl mb-2">Order not found</p>
          <p className="text-gray-500 mb-6">This order may have been deleted or doesn't exist</p>
          <button
            onClick={() => navigate("/admin_orders")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate("/admin_orders")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`${getStatusColor(order.status)} text-white px-6 py-6`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Current Status</p>
              <p className="text-2xl font-bold">{getStatusText(order.status)}</p>
            </div>
            
          </div>
          <p className="text-sm mt-2 opacity-90">
            Placed {getTimeAgo(order.created_at)}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Order Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Information</h2>
          
          <div className="space-y-4">
            {/* Restaurant */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Restaurant</p>
                <p className="font-semibold text-gray-900">{order.restaurant_name}</p>
              </div>
            </div>

            {/* Table */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Table Number</p>
                <p className="font-semibold text-gray-900">Table {order.table_number}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Order Time</p>
                <p className="font-semibold text-gray-900">{formatTime(order.created_at)}</p>
              </div>
            </div>

            {/* Order ID */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="font-semibold text-gray-900">#{order.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Order Items ({order.items?.length || 0})
          </h2>

          <div className="space-y-3">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {/* Quantity Badge */}
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  {item.quantity}×
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-1">{item.menu_item.name}</p>
                  <p className="text-sm text-gray-500">${item.price} each</p>
                </div>

                {/* Item Total */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">${order.total_amount}</span>
            </div>

            {/* Tax (if applicable) */}
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span className="font-semibold">$0.00</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-emerald-600">${order.total_amount}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">


          <button 
            onClick={() => window.print()}
            className="w-full bg-white border-2 border-gray-200 hover:border-emerald-500 text-gray-900 font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;