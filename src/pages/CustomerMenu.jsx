import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerMenu } from "../services/customerApi";
import { ArrowLeft, Search, ShoppingCart } from "lucide-react";

const CustomerMenu = () => {
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState("");
  const [tableNumber, setTableNumber] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const categoryRefs = useRef({});

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const { data } = await getCustomerMenu(restaurantId, tableId);
      setRestaurant(data.restaurant.name);
      setTableNumber(data.table.number);
      setMenu(data.items);
      
      if (data.items.length > 0) {
        const categories = getCategories(data.items);
        if (categories.length > 0) {
          setActiveCategory(categories[0]);
        }
      }
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  };

  const getCategories = (items) => {
    const categorySet = new Set();
    items.forEach(item => {
      if (item.category && item.category.name) {
        categorySet.add(item.category.name);
      }
    });
    return Array.from(categorySet);
  };

  /* Group items by category name */
  const groupedMenu = menu.reduce((acc, item) => {
    const categoryName = item.category?.name || "Other";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedMenu);

  const scrollToCategory = (category) => {
    setActiveCategory(category);
    const element = categoryRefs.current[category];
    if (element) {
      
      const headerOffset = 130; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);

  const goToCart = () => {
    navigate(`/cart/${tableId}`, {
      state: {
        cart,
        restaurant,
        tableNumber,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">{restaurant}</h1>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div 
            className="flex overflow-x-auto border-b"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <style>{`
              .category-tabs::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "text-emerald-500 border-b-2 border-emerald-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Menu Items */}
      <main className="px-4 py-6 max-w-7xl mx-auto">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu items available</p>
          </div>
        ) : (
          categories.map((category) => (
            <section 
              key={category} 
              id={category} 
              ref={(el) => (categoryRefs.current[category] = el)}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category}
              </h2>
              
              <div className="space-y-4">
                {groupedMenu[category].map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="flex items-center p-4 gap-4">
                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            {item.is_veg !== undefined && (
                              <span className={`w-4 h-4 border-2 flex items-center justify-center ${
                                item.is_veg ? 'border-green-600' : 'border-red-600'
                              }`}>
                                <span className={`w-2 h-2 rounded-full ${
                                  item.is_veg ? 'bg-green-600' : 'bg-red-600'
                                }`}></span>
                              </span>
                            )}
                          </div>
                          <span className="text-emerald-500 font-bold text-lg whitespace-nowrap ml-2">
                            ₹{item.price}
                          </span>
                        </div>
                        
                        {item.description && (
                          <p 
                            className="text-sm text-gray-500 mb-3 overflow-hidden"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                        
                        <button
                          onClick={() => addToCart(item)}
                          disabled={!item.is_available}
                          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            item.is_available
                              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {item.is_available ? '+ Add' : 'Not Available'}
                        </button>
                      </div>

                      {/* Item Image */}
                      {item.image && (
                        <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none" style={{
          background: 'linear-gradient(to top, white, white, transparent)'
        }}>
          <button
            onClick={goToCart}
            className="w-full max-w-md mx-auto bg-emerald-500 text-white rounded-2xl py-4 px-6 flex items-center justify-between shadow-lg hover:bg-emerald-600 transition-all pointer-events-auto"
            style={{
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-white text-emerald-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="font-semibold text-lg">View Cart</span>
            </div>
            <div className="text-lg font-bold">
              Subtotal: ₹{cartTotal.toFixed(2)}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerMenu;