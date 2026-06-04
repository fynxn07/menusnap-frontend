import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, Share2, Leaf, Flame, Clock, Minus, Plus, Star, Heart } from "lucide-react";
import toast from "react-hot-toast";

const ItemDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Get item from location state or fetch from API
    if (location.state?.item) {
      setItem(location.state.item);
    } else {
      // Fetch item details from API if not passed via state
      // fetchItemDetails(itemId);
    }
  }, [itemId, location.state]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.name,
        text: item?.description,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      toast.success('Link copied to clipboard!');
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    const cartItem = { ...item, quantity };
    
    // Get existing cart from location state
    const restaurantId = location.state?.restaurantId;
    const tableId = location.state?.tableId;
    const restaurant = location.state?.restaurant;
    const tableNumber = location.state?.tableNumber;
    
    // Navigate back to menu with cart update
    navigate(`/menu/${restaurantId}/${tableId}`, {
      state: {
        addToCart: cartItem,
        restaurant,
        tableNumber,
      }
    });
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const totalPrice = (parseFloat(item.price) * quantity).toFixed(2);
  const rating = 4.5; // Mock rating - replace with actual data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          
          <h1 className="text-lg font-bold text-gray-900">Dish Details</h1>
          
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <Share2 className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto pb-32">
        {/* Image Section - Properly Sized */}
        <div className="px-4 pt-6 pb-4">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl">
            {item.image ? (
              <>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {/* Favorite Button */}
                <button
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
                  }}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 space-y-6">
          {/* Title, Rating & Price Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {item.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{rating}</span>
                  <span className="text-sm text-gray-400">(128 reviews)</span>
                </div>
              </div>

              {/* Price Badge */}
              <div className="bg-emerald-50 rounded-xl px-4 py-3 text-right">
                <p className="text-xs text-emerald-600 font-semibold mb-1">PRICE</p>
                <p className="text-2xl font-bold text-emerald-600">${item.price}</p>
              </div>
            </div>

            {/* Info Badges */}
            <div className="flex flex-wrap gap-2">
              {item.is_veg !== undefined && (
                <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold ${
                  item.is_veg 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <Leaf className="w-3.5 h-3.5" />
                  {item.is_veg ? 'VEGETARIAN' : 'NON-VEG'}
                </div>
              )}
              
              <div className="px-3 py-1.5 bg-orange-100 rounded-full flex items-center gap-1.5 text-orange-700 text-xs font-bold">
                <Flame className="w-3.5 h-3.5" />
                350 CAL
              </div>
              
              <div className="px-3 py-1.5 bg-blue-100 rounded-full flex items-center gap-1.5 text-blue-700 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                15-20 MIN
              </div>
            </div>
          </div>

          {/* Description Card */}
          {item.description && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                About This Dish
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Ingredients Card (Mock Data) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Key Ingredients
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil', 'Dough', 'Sea Salt'].map((ingredient, index) => (
                <div key={index} className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                  <p className="text-sm font-semibold text-gray-700">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nutritional Info Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-emerald-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
              Nutritional Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Calories', value: '350' },
                { label: 'Protein', value: '12g' },
                { label: 'Carbs', value: '45g' },
                { label: 'Fat', value: '14g' },
              ].map((item, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Status */}
          {!item.is_available && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-800 font-bold">Currently Unavailable</p>
                  <p className="text-red-600 text-sm">This item is temporarily out of stock</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-100 rounded-2xl">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-3 hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-l-2xl"
              >
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
              
              <div className="px-5 py-3 min-w-[50px] text-center">
                <span className="text-lg font-bold text-gray-900">{quantity}</span>
              </div>
              
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-3 hover:bg-gray-200 transition-colors rounded-r-2xl"
              >
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!item.is_available}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-between transition-all ${
                item.is_available
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 active:scale-[0.98]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </span>
              <span className="text-lg font-bold">${totalPrice}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;