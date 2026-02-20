import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem } from "../services/menuService";
import { ChevronLeft, Trash2, Edit, Star, TrendingUp, MessageSquare, Utensils, Sparkles } from "lucide-react";

const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getItem(id);
    setItem(res.data);
  };

  if (!item) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 text-emerald-600 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">MENU</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-sm">STARTERS</span>
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {``}}
            className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate(`/edit_items/${id}`)}
            className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{item.name}</h1>
            <p className="text-sm text-gray-500">Product ID: {item.sku || `SKU-${item.id}`}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
              {item.is_available ? "ACTIVE" : "INACTIVE"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.is_available}
                onChange={() => {}}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Item Image */}
      <div className="px-4 mb-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={
              item.image 
                ? (item.image.startsWith('http') 
                    ? item.image 
                    : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${item.image}`)
                : "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop"
            }
            alt={item.name}
            className="w-full h-72 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop";
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-emerald-500 text-white font-bold px-4 py-2 rounded-full text-lg shadow-lg">
              ${item.price}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Item Details</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            {item.description || "No description available for this item."}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.is_veg && (
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                Vegetarian
              </span>
            )}
            {item.is_best_seller && (
              <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                Best Seller
              </span>
            )}
            {item.contains_gluten && (
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                Contains Gluten
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Item Insights</h2>
            <span className="text-xs text-gray-500">Last 30 Days</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Total Orders */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{item.total_orders || "1,284"}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-500 font-semibold">
                  {item.order_growth || "+12%"} vs LY
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Rating</p>
              <div className="flex items-center gap-1">
                <p className="text-3xl font-bold text-gray-900">{item.avg_rating || "4.8"}</p>
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Based on {item.review_count || "340"} reviews
              </p>
            </div>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Popularity Trend</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Order Volume</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-1 h-24">
              {(item.popularity_data || [45, 52, 48, 65, 72, 58, 68, 82, 55, 62, 78, 95]).map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-emerald-200 rounded-t-sm hover:bg-emerald-400 transition-colors cursor-pointer"
                  style={{ height: `${value}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Knowledge Summary */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5 shadow-sm border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">AI Knowledge Summary</h2>
          </div>

          <div className="space-y-4">
            {/* Customer Question */}
            <div className="flex gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  Customers frequently ask if this can be made <span className="font-bold">gluten-free</span>. 
                  The chatbot handled <span className="font-bold">{item.allergen_inquiries || "45"}</span> inquiries 
                  about allergens this month.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Utensils className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  Most common pairing suggestion requested: <span className="font-bold italic">
                    {item.common_pairing_1 || "Garlic Knots"}
                  </span> or <span className="font-bold italic">
                    {item.common_pairing_2 || "House Pinot Grigio"}
                  </span>.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Star className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  Sentiment is <span className="font-bold text-emerald-700">highly positive</span> regarding 
                  the freshness of the basil but some mentions of "thinner crust" preferences noted in chats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex justify-around items-center max-w-screen-xl mx-auto">
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-emerald-500">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
            <span className="text-xs font-semibold">Menu</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs">Sales</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;