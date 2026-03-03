// // import { useEffect, useRef, useState } from "react";
// // import { UtensilsCrossed, CheckCircle } from "lucide-react";

// // const WaiterPage = () => {
// // const socketRef = useRef(null);
// // const reconnectTimeoutRef = useRef(null);

// // const [orders, setOrders] = useState([]);

// // useEffect(() => {
// // connectWebSocket();


// // return () => {
// //   if (socketRef.current) socketRef.current.close();
// //   if (reconnectTimeoutRef.current)
// //     clearTimeout(reconnectTimeoutRef.current);
// // };


// // }, []);


// // const connectWebSocket = () => {
// // const restaurantId = localStorage.getItem("restaurant_id");


// // if (!restaurantId) {
// //   console.error("Restaurant ID missing");
// //   return;
// // }

// // const socket = new WebSocket(
// //   `ws://localhost:8080/ws/waiter_${restaurantId}/`
// // );

// // socketRef.current = socket;

// // socket.onopen = () => {
// //   console.log("✅ Connected to waiter WS");
// // };

// // socket.onmessage = (event) => {
// //   const data = JSON.parse(event.data);
// //   console.log("🔔 Waiter WS FULL:", JSON.stringify(data, null, 2));

// //   switch (data.event) {

// //     case "order_ready":
// //       if (!data.order) return;

// //       setOrders((prev) => {
// //         const exists = prev.some((o) => o.id === data.order.id);
// //         if (exists) return prev;
// //         return [data.order, ...prev];
// //       });
// //       break;


// //     case "order_served":
// //       if (!data.order_id) return;

// //       setOrders((prev) =>
// //         prev.filter((o) => o.id !== data.order_id)
// //       );
// //       break;

// //     default:
// //       break;
// //   }
// // };

// // socket.onerror = (err) => {
// //   console.log("❌ WS error", err);
// // };

// // socket.onclose = () => {
// //   console.log("⚠️ WS closed — reconnecting...");
// //   socketRef.current = null;

// //   reconnectTimeoutRef.current = setTimeout(() => {
// //     connectWebSocket();
// //   }, 3000);
// // };


// // };


// // const markServed = async (orderId) => {
// // try {
// // const token = localStorage.getItem("access");

// //   const res = await fetch(
// //     `http://localhost:8080/orders/kitchen/${orderId}/update_status/`,
// //     {
// //       method: "PATCH",
// //       headers: {
// //         "Content-Type": "application/json",
// //         ...(token && { Authorization: `Bearer ${token}` }),
// //       },
// //       body: JSON.stringify({ status: "SERVED" }),
// //     }
// //   );

// //   if (!res.ok) throw new Error("Failed");

// // } catch (err) {
// //   alert("Failed to mark as served");
// // }


// // };


// // return ( <div className="min-h-screen bg-gray-900 text-white p-6"> <h1 className="text-3xl font-bold mb-6 text-emerald-400">
// // Ready to Serve </h1>

// //   {orders.length === 0 ? (
// //     <div className="text-center text-gray-400 mt-20">
// //       <UtensilsCrossed className="mx-auto mb-4 w-12 h-12" />
// //       No ready orders
// //     </div>
// //   ) : (
// //     <div className="space-y-4">
// //       {orders.map((order) => (
// //         <div
// //           key={order.id}
// //           className="bg-gray-800 p-5 rounded-xl border border-gray-700"
// //         >
// //           <h2 className="text-2xl font-bold text-emerald-400">
// //             TABLE {order.table_number}
// //           </h2>

// //           <p className="text-gray-400 mb-3">
// //             Order #{order.id.toString().slice(-4)}
// //           </p>

// //           {/* Items */}
// //           <div className="mb-4">
// //             {order.items?.map((item, i) => (
// //               <div key={i}>
// //                 {item.quantity}x {item.menu_item?.name || item.name}
// //               </div>
// //             ))}
// //           </div>

// //           <button
// //             onClick={() => markServed(order.id)}
// //             className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg flex items-center justify-center gap-2 font-bold"
// //           >
// //             <CheckCircle className="w-5 h-5" />
// //             MARK AS SERVED
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //   )}
// // </div>

// // );
// // };

// // export default WaiterPage;


// import { useEffect, useRef, useState } from "react";
// import { UtensilsCrossed, CheckCircle } from "lucide-react";

// const WaiterPage = () => {
//   const socketRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     fetchReadyOrders().then(() => {
//       connectWebSocket();
//     });


//     return () => {
//       if (socketRef.current) socketRef.current.close();
//       if (reconnectTimeoutRef.current)
//         clearTimeout(reconnectTimeoutRef.current);
//     };


//   }, []);


//   const fetchReadyOrders = async () => {
//     try {
//       const token = localStorage.getItem("access");


//       const res = await fetch(
//         "http://localhost:8080/orders/waiter_order/",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//         }
//       );

//       if (!res.ok) throw new Error("Failed to fetch");

//       const data = await res.json();

//       setOrders(data);
//       setLoading(false);

//     } catch (err) {
//       console.error("Failed to fetch waiter orders", err);
//       setLoading(false);
//     }


//   };

//   const connectWebSocket = () => {
//     const restaurantId = localStorage.getItem("restaurant_id");


//     if (!restaurantId) {
//       console.error("Restaurant ID missing");
//       return;
//     }

//     const socket = new WebSocket(
//       `ws://localhost:8080/ws/waiter_${restaurantId}/`
//     );

//     socketRef.current = socket;

//     socket.onopen = () => {
//       console.log("✅ Connected to waiter WS");
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("🔔 Waiter WS:", data);

//       switch (data.event) {

//         // 🔥 NEW READY ORDER
//         case "order_ready":
//           if (!data.order) return;

//           setOrders((prev) => {
//             const exists = prev.some((o) => o.id === data.order.id);
//             if (exists) return prev;
//             return [data.order, ...prev];
//           });
//           break;

//         // 🔥 ORDER SERVED → REMOVE
//         case "order_served":
//           if (!data.order_id) return;

//           setOrders((prev) =>
//             prev.filter((o) => o.id !== data.order_id)
//           );
//           break;

//         default:
//           break;
//       }
//     };

//     socket.onerror = (err) => {
//       console.log("❌ WS error", err);
//     };

//     socket.onclose = () => {
//       console.log("⚠️ WS closed — reconnecting...");
//       socketRef.current = null;

//       reconnectTimeoutRef.current = setTimeout(() => {
//         connectWebSocket();
//       }, 3000);
//     };


//   };


//   const markServed = async (orderId) => {
//     try {
//       const token = localStorage.getItem("access");


//       const res = await fetch(
//         `http://localhost:8080/orders/kitchen/${orderId}/update_status/`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify({ status: "SERVED" }),
//         }
//       );

//       if (!res.ok) throw new Error("Failed");

//       // Optional optimistic removal
//       setOrders((prev) =>
//         prev.filter((o) => o.id !== orderId)
//       );

//     } catch (err) {
//       alert("Failed to mark as served");
//     }


//   };


//   if (loading) {
//     return (<div className="min-h-screen bg-gray-900 flex items-center justify-center text-emerald-400">
//       Loading ready orders... </div>
//     );
//   }


//   return (<div className="min-h-screen bg-gray-900 text-white p-6"> <h1 className="text-3xl font-bold mb-6 text-emerald-400">
//     Ready to Serve </h1>

//     {orders.length === 0 ? (
//       <div className="text-center text-gray-400 mt-20">
//         <UtensilsCrossed className="mx-auto mb-4 w-12 h-12" />
//         No ready orders
//       </div>
//     ) : (
//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="bg-gray-800 p-5 rounded-xl border border-gray-700"
//           >
//             <h2 className="text-2xl font-bold text-emerald-400">
//               TABLE {order.table_number}
//             </h2>

//             <p className="text-gray-400 mb-3">
//               Order #{order.id.toString().slice(-4)}
//             </p>

//             {/* ITEMS */}
//             <div className="mb-4">
//               {order.items?.map((item, i) => (
//                 <div key={i}>
//                   {item.quantity}x {item.menu_item?.name || item.name}
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={() => markServed(order.id)}
//               className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg flex items-center justify-center gap-2 font-bold"
//             >
//               <CheckCircle className="w-5 h-5" />
//               MARK AS SERVED
//             </button>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>


//   );
// };

// export default WaiterPage;


import { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, CheckCircle, Clock, AlertTriangle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const WaiterPage = () => {
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [servedOrders, setServedOrders] = useState([]);

  useEffect(() => {
    fetchReadyOrders().then(() => {
      connectWebSocket();
    });

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  const fetchReadyOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch("http://localhost:8080/orders/waiter_order/", {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch waiter orders", err);
      toast.error("Failed to load orders");
      setLoading(false);
    }
  };

  const connectWebSocket = () => {
    const restaurantId = localStorage.getItem("restaurant_id");

    if (!restaurantId) {
      console.error("Restaurant ID missing");
      return;
    }

    const socket = new WebSocket(
      `ws://localhost:8080/ws/waiter_${restaurantId}/`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Connected to waiter WS");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔔 Waiter WS:", data);

      switch (data.event) {
        case "order_ready":
          if (!data.order) return;

          setOrders((prev) => {
            const exists = prev.some((o) => o.id === data.order.id);
            if (exists) return prev;
            return [data.order, ...prev];
          });
          
          toast.success(`Order #${data.order.id} ready for Table ${data.order.table_number}!`);
          break;

        case "order_served":
          if (!data.order_id) return;

          setOrders((prev) => prev.filter((o) => o.id !== data.order_id));
          break;

        default:
          break;
      }
    };

    socket.onerror = (err) => {
      console.log("❌ WS error", err);
    };

    socket.onclose = () => {
      console.log("⚠️ WS closed — reconnecting...");
      socketRef.current = null;

      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };
  };

  const markServed = async (orderId, tableNumber) => {
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
          body: JSON.stringify({ status: "SERVED" }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      // Add to served history
      const servedOrder = orders.find(o => o.id === orderId);
      if (servedOrder) {
        setServedOrders(prev => [{ ...servedOrder, servedAt: new Date() }, ...prev]);
      }

      // Remove from active orders
      setOrders((prev) => prev.filter((o) => o.id !== orderId));

      toast.success(`Table ${tableNumber} marked as served!`);
    } catch (err) {
      toast.error("Failed to mark as served");
    }
  };

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return "";
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 min ago";
    if (diffMins < 60) return `${diffMins} mins ago`;

    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  const getUrgencyColor = (createdAt) => {
    if (!createdAt) return "bg-emerald-900/30 border-emerald-500/30";
    
    const diffMins = Math.floor((new Date() - new Date(createdAt)) / 60000);
    
    if (diffMins > 12) return "bg-orange-900/30 border-orange-500";
    if (diffMins > 6) return "bg-yellow-900/30 border-yellow-500";
    return "bg-emerald-900/30 border-emerald-500/30";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-400 font-semibold">Loading ready orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-emerald-500/20 sticky top-0 z-40">
        <div className="px-4 py-5 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                
                <h1 className="text-2xl font-bold text-white">Ready to Serve</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-bold text-sm">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-12 h-12 text-emerald-400/50" />
            </div>
            <p className="text-gray-400 text-lg font-semibold">No ready orders</p>
            <p className="text-gray-500 text-sm mt-2">Orders will appear here when ready</p>
          </div>
        ) : (
          /* Orders List */
          orders.map((order) => {
            const timeAgo = getTimeAgo(order.created_at);
            const urgencyClass = getUrgencyColor(order.created_at);
            const isUrgent = timeAgo.includes("mins ago") && parseInt(timeAgo) > 12;

            return (
              <div
                key={order.id}
                className={`bg-gray-800/50 backdrop-blur-sm border-2 ${urgencyClass} rounded-2xl p-5 hover:border-emerald-400 transition-all`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  {/* Table Badge */}
                  <div className={`${isUrgent ? 'bg-orange-500/20' : 'bg-emerald-500/20'} rounded-xl px-4 py-3 min-w-[120px]`}>
                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Table</p>
                    <p className={`${isUrgent ? 'text-orange-400' : 'text-emerald-400'} text-3xl font-bold`}>
                      T-{order.table_number?.toString().padStart(2, '0')}
                    </p>
                  </div>

                  {/* Order Info */}
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold text-lg mb-1">
                      #ORD-{order.id?.toString().slice(-4)}
                    </p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      {isUrgent && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                      <Clock className="w-4 h-4" />
                      <span className={isUrgent ? 'text-orange-400 font-semibold' : ''}>
                        {timeAgo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-6">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white">
                      <span className="text-gray-400">•</span>
                      <span className="font-semibold">{item.quantity}x</span>
                      <span>{item.menu_item?.name || item.name}</span>
                      {item.notes && (
                        <span className="text-gray-400 text-sm">({item.notes})</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mark as Served Button */}
                <button
                  onClick={() => markServed(order.id, order.table_number)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg">MARK AS SERVED</span>
                </button>
              </div>
            );
          })
        )}

        {/* Recent History */}
        {servedOrders.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between hover:border-emerald-500/50 transition-colors"
            >
              <span className="text-gray-400 font-semibold">Recent History</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
            </button>

            {showHistory && (
              <div className="mt-4 space-y-3">
                {servedOrders.slice(0, 5).map((order, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">T-{order.table_number?.toString().padStart(2, '0')}</p>
                      <p className="text-gray-500 text-sm">
                        Served {getTimeAgo(order.servedAt)} • #ORD-{order.id?.toString().slice(-4)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaiterPage;