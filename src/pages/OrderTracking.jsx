import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderStatus } from "../services/customerApi";
import { ArrowLeft, Check, UtensilsCrossed, Home as HomeIcon, User, MessageCircle } from "lucide-react";

const STATUS_FLOW = ["PLACED", "PREPARING", "READY", "SERVED"];

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const { data } = await getOrderStatus(orderId);
      setOrder(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Order not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = STATUS_FLOW.indexOf(order.status);

  const getETA = () => {
    if (order.status === "PLACED") return "25 - 35 mins";
    if (order.status === "PREPARING") return "15 mins left";
    if (order.status === "READY") return "Ready now";
    return "Completed";
  };

  const getMainTitle = () => {
    if (order.status === "PLACED") return "Order Confirmed";
    if (order.status === "PREPARING") return "Preparing your meal";
    if (order.status === "READY") return "Ready to Serve";
    return "Served";
  };

  const getMainSubtitle = () => {
    if (order.status === "PLACED") return "Your order has been confirmed";
    if (order.status === "PREPARING") return "Your meal is being crafted with care.";
    if (order.status === "READY") return "Your order is ready!";
    return "Enjoy your delicious meal";
  };

  const getEstimatedTime = () => {
    if (order.status === "PLACED") return "12:55 PM";
    if (order.status === "PREPARING") return "12:55 PM";
    if (order.status === "READY") return "Now";
    return "Completed";
  };

  const getStatusIcon = (status) => {
    if (status === "PLACED") return <Check className="w-6 h-6" />;
    if (status === "PREPARING") return <UtensilsCrossed className="w-6 h-6" />;
    if (status === "READY") return <HomeIcon className="w-6 h-6" />;
    return <User className="w-6 h-6" />;
  };

  const getStatusLabel = (status) => {
    if (status === "PLACED") return "Ordered";
    if (status === "PREPARING") return "Preparing";
    if (status === "READY") return "Ready to Serve";
    return "Served";
  };

  const getStatusDescription = (status) => {
    if (status === "PLACED") return "Order confirmed at " + new Date(order.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    if (status === "PREPARING") return "Our chefs are busy in the kitchen";
    if (status === "READY") return "Almost there! Getting ready for you";
    return "Enjoy your delicious meal";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Order Status</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-50"></div>
            <div className="relative bg-white rounded-full p-8 shadow-lg">
              <div className="w-20 h-20 flex items-center justify-center">
                <UtensilsCrossed className="w-16 h-16 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getMainTitle()}
          </h2>
          <p className="text-gray-500 italic">"{getMainSubtitle()}"</p>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wider mb-1">
                Estimated Arrival
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {getEstimatedTime()}
              </p>
            </div>
            <div className="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm">
              {getETA()}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="space-y-6">
            {STATUS_FLOW.map((status, index) => {
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const isCompleted = index < currentIndex;

              return (
                <div key={status} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {getStatusIcon(status)}
                      </div>
                      
                      {index < STATUS_FLOW.length - 1 && (
                        <div
                          className={`absolute left-1/2 top-14 w-0.5 h-12 -ml-px transition-all ${
                            isCompleted ? "bg-emerald-500" : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>

                    {/* Status Info */}
                    <div className="flex-1 pt-2">
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          isActive ? "text-emerald-500" : "text-gray-400"
                        }`}
                      >
                        {getStatusLabel(status)}
                      </h3>
                      <p
                        className={`text-sm ${
                          isActive ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {getStatusDescription(status)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <div className="text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wider">
            Last Updated: Just Now
          </p>
        </div>
      </main>

      

      {/* Bottom Navigation
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => navigate("/menu/:restaurantId/:tableId")}
             className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs font-medium">HOME</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-emerald-500">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
              </div>
              <span className="text-xs font-medium">ORDERS</span>
            </button>
          </div>
        </div>
      </nav> */}


    </div>
  );
};

export default OrderTracking;