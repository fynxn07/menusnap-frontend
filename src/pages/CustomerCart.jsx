import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { createCustomerOrder } from "../services/customerApi";
import { ArrowLeft, Minus, Plus } from "lucide-react";

const CustomerCart = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { cart: initialCart, restaurant, tableNumber } = location.state || {};

  const [cart, setCart] = useState(initialCart || []);
  const [loading, setLoading] = useState(false);

  if (!initialCart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Go Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const subtotal = cart.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);
  const deliveryFee = 0; 
  const tax = subtotal * 0.075; 
  const total = subtotal + deliveryFee + tax;

  const placeOrder = async () => {
    try {
      setLoading(true);

      const items = cart.map((i) => ({
        menu_item: i.id,
        quantity: i.quantity,
      }));

      const { data } = await createCustomerOrder(tableId, items);

      navigate(`/track/${data.order_id}`);
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
        </div>
      </header>


      <main className="px-4 py-6 max-w-2xl mx-auto">
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4"
            >

              {item.image && (
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-emerald-500 font-bold text-lg mb-1">
                  ₹{parseFloat(item.price).toFixed(2)}
                </p>
                {item.description && (
                  <p
                    className="text-sm text-gray-400 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-base">Subtotal</span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="text-base">Delivery Fee</span>
            <span className="text-lg font-bold text-emerald-500">FREE</span>
          </div>

          {/* Tax */}
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-base">Tax</span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{tax.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
      </main>

      <div
        className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none"
        style={{
          background: "linear-gradient(to top, white, white, transparent)",
        }}
      >
        <button
          onClick={placeOrder}
          disabled={loading || cart.length === 0}
          className="w-full max-w-2xl mx-auto bg-emerald-500 text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg hover:bg-emerald-600 transition-all pointer-events-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
          style={{
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (!loading && cart.length > 0) {
              e.currentTarget.style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            if (!loading && cart.length > 0) {
              e.currentTarget.style.transform = "scale(0.98)";
            }
          }}
          onMouseUp={(e) => {
            if (!loading && cart.length > 0) {
              e.currentTarget.style.transform = "scale(1.02)";
            }
          }}
        >
          <span className="text-lg font-bold">
            {loading ? "Placing Order..." : `Place Order • ₹${total.toFixed(2)}`}
          </span>
          {!loading && (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomerCart;