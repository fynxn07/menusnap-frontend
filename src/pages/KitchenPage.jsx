


import { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, Clock, AlertTriangle, Play, Settings } from "lucide-react";

const Kitchen = () => {
  const socketRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("NEW");
  const [restaurant, setRestaurant] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    fetchOrders().then(() => {
      connectWebSocket();
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        "http://localhost:8080/orders/kitchen_order/",
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();

      setOrders(data);

      if (data.length > 0) {
        setRestaurant(data[0].restaurant_name);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // 🔥 WEBSOCKET CONNECTION (MULTI-TENANT SAFE)
  const connectWebSocket = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const restaurantId = localStorage.getItem("restaurant_id");

    if (!restaurantId) {
      console.error("Restaurant ID missing — WS not started");
      return;
    }

    const socket = new WebSocket(
      `ws://localhost:8080/ws/kitchen_${restaurantId}/`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Connected to kitchen WS");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔔 WS:", data);

      switch (data.event) {

        // ===============================
        // 🔥 NEW ORDER
        // ===============================
        case "new_order":
          if (!data.order) return;

          setOrders((prev) => {
            const exists = prev.some(
              (o) => o.id.toString() === data.order.id.toString()
            );

            if (exists) return prev;

            playNotificationSound();
            return [data.order, ...prev];
          });
          break;

        // ===============================
        // 🔥 ORDER UPDATED
        // ===============================
        case "order_updated":
          if (!data.order) return;

          setOrders((prev) => {
            // Remove served/cancelled
            if (!data.is_active) {
              return prev.filter((o) => o.id !== data.order.id);
            }

            // Update existing
            return prev.map((o) =>
              o.id === data.order.id ? data.order : o
            );
          });
          break;

        default:
          break;
      }
    };

    socket.onerror = (err) => {
      console.log("❌ WebSocket error", err);
    };

    socket.onclose = () => {
      console.log("⚠️ WebSocket closed, attempting to reconnect...");
      socketRef.current = null;

      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };
  };

  const playNotificationSound = () => {
    try {
      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => { });
    } catch { }
  };

  // 🔥 UPDATE ORDER STATUS
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        `http://localhost:8080/orders/kitchen/${orderId}/update_status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        // Optimistic update
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      } else {
        const errorData = await res.json();
        console.error("Failed to update status:", errorData);
        alert(
          `Failed to update order status: ${errorData.detail || "Unknown error"
          }`
        );
      }
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Failed to update order status. Please try again.");
    }
  };

  const startPreparing = (id) => updateOrderStatus(id, "PREPARING");
  const markReady = (id) => updateOrderStatus(id, "READY");
  const markServed = (id) => updateOrderStatus(id, "SERVED");

  // 🔥 FILTERING
  const getFilteredOrders = () => {
    if (activeTab === "NEW") return orders.filter(o => o.status === "PLACED");
    if (activeTab === "PREPARING") return orders.filter(o => o.status === "PREPARING");
    if (activeTab === "READY") return orders.filter(o => o.status === "READY");
    return orders;
  };

  const filteredOrders = getFilteredOrders();

  const getTimeAgo = (timestamp) => {
    const diffMins = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1m ago";
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };

  const countByStatus = (status) =>
    orders.filter(o => o.status === status).length;

  const calculateAvgTime = (status) => {
    const list = orders.filter(o => o.status === status);
    if (!list.length) return "0m";

    const avg =
      list.reduce(
        (sum, o) => sum + (Date.now() - new Date(o.created_at)),
        0
      ) / list.length / 60000;

    return avg < 60 ? `${Math.floor(avg)}m` : `${Math.floor(avg / 60)}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-400">Loading kitchen orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border-b border-emerald-800 sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <UtensilsCrossed className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white uppercase">
                  {restaurant}
                </h1>
                <p className="text-emerald-400 font-medium text-sm sm:text-base">
                  Kitchen Orders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-500 bg-opacity-20 border border-emerald-500 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-bold uppercase text-xs sm:text-sm">
                LIVE
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 sm:gap-8 px-4 sm:px-6 border-b-2 border-gray-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab("NEW")}
            className={`pb-3 px-2 font-bold uppercase text-xs sm:text-sm relative transition-colors whitespace-nowrap ${activeTab === "NEW" ? "text-emerald-400" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            NEW
            {countByStatus("PLACED") > 0 && (
              <span className="ml-2 px-2 py-1 bg-emerald-500 text-white rounded-md text-xs">
                {countByStatus("PLACED")}
              </span>
            )}
            {activeTab === "NEW" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("PREPARING")}
            className={`pb-3 px-2 font-bold uppercase text-xs sm:text-sm relative transition-colors whitespace-nowrap ${activeTab === "PREPARING" ? "text-emerald-400" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            PREPARING
            {countByStatus("PREPARING") > 0 && (
              <span className="ml-2 px-2 py-1 bg-emerald-500 text-white rounded-md text-xs">
                {countByStatus("PREPARING")}
              </span>
            )}
            {activeTab === "PREPARING" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("READY")}
            className={`pb-3 px-2 font-bold uppercase text-xs sm:text-sm relative transition-colors whitespace-nowrap ${activeTab === "READY" ? "text-emerald-400" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            READY
            {countByStatus("READY") > 0 && (
              <span className="ml-2 px-2 py-1 bg-emerald-500 text-white rounded-md text-xs">
                {countByStatus("READY")}
              </span>
            )}
            {activeTab === "READY" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400"></div>
            )}
          </button>
        </div>
      </header>

      {/* Orders List */}
      <main className="px-4 sm:px-6 py-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <UtensilsCrossed className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No {activeTab.toLowerCase()} orders</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border-2 border-gray-700 rounded-2xl p-4 sm:p-6 hover:border-emerald-600 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">
                      TABLE {order.table_number}
                    </h2>
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm flex-wrap">
                      <span>Order ID: #{order.id.toString().slice(-4)}</span>
                      <span>•</span>
                      <span>{getTimeAgo(order.created_at)}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      ₹{parseFloat(order.total_amount).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-gray-700 rounded-lg flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-base">
                          {item.quantity}x
                        </span>
                      </div>
                      <span className="text-white text-base sm:text-lg">
                        {item.menu_item?.name || item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Special Instructions */}
                {order.special_instructions && (
                  <div className="mb-4 p-3 sm:p-4 bg-yellow-900 bg-opacity-30 border-l-4 border-yellow-500 rounded">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-yellow-200 uppercase font-bold text-xs sm:text-sm">
                        {order.special_instructions}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {order.status === "PLACED" && (
                  <button
                    onClick={() => startPreparing(order.id)}
                    className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 sm:gap-3 font-bold text-base sm:text-lg transition-colors"
                  >
                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                    START PREPARING
                  </button>
                )}

                {order.status === "PREPARING" && (
                  <button
                    onClick={() => markReady(order.id)}
                    className="w-full py-3 sm:py-4 bg-yellow-600 hover:bg-yellow-700 rounded-xl flex items-center justify-center gap-2 sm:gap-3 font-bold text-base sm:text-lg transition-colors"
                  >
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                    MARK AS READY
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-emerald-800 py-3 sm:py-4 px-4 sm:px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto">
            <div>
              <span className="text-white font-bold text-sm sm:text-lg">
                {countByStatus("PLACED")} New
              </span>
              <p className="text-gray-400 text-xs sm:text-sm">
                Avg: {calculateAvgTime("PLACED")}
              </p>
            </div>
            <div>
              <span className="text-white font-bold text-sm sm:text-lg">
                {countByStatus("PREPARING")} Prep
              </span>
              <p className="text-gray-400 text-xs sm:text-sm">
                Avg: {calculateAvgTime("PREPARING")}
              </p>
            </div>
            <div>
              <span className="text-white font-bold text-sm sm:text-lg">
                {countByStatus("READY")} Ready
              </span>
            </div>
          </div>

          <button
            onClick={fetchOrders}
            className="p-2 sm:p-3 hover:bg-gray-800 rounded-lg transition-colors"
            title="Refresh orders"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Kitchen;







