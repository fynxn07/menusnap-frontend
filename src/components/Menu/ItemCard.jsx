import { useNavigate } from "react-router-dom";
import { deleteItem, updateItem } from "../../services/menuService";
import { Eye, Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const ItemCard = ({ item, refresh }) => {
  const navigate = useNavigate();
  const [isTogglingStock, setIsTogglingStock] = useState(false);

  
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteItem(item.id);
      toast.success(`${item.name} deleted successfully`);
      refresh();
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error);
    }
  };

  const handleStockToggle = async () => {
    if (isTogglingStock) return;

    setIsTogglingStock(true);

    try {
      await updateItem(item.id, {
        is_available: !item.is_available,
      });

      toast.success(
        `${item.name} is now ${!item.is_available ? "In Stock" : "Out of Stock"}`
      );

      refresh();
    } catch (error) {
      toast.error("Failed to update stock status");
      console.error(error);
    } finally {
      setIsTogglingStock(false);
    }
  };


  const imageUrl = item.image;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="relative flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-24 h-24 rounded-lg object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop";
            }}
          />
        ) : (
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className={`w-3 h-3 rounded-full ${item.is_available ? "bg-emerald-500" : "bg-red-500"}`}></div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-base mb-1 truncate">{item.name}</h3>
        <p className="text-emerald-500 font-bold text-lg mb-1">${item.price}</p>
        <p className={`text-sm font-medium ${item.is_available ? 'text-emerald-600' : 'text-red-600'}`}>
          {item.is_available ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => navigate(`/view_items/${item.id}`)}
          className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
          title="View Details"
        >
          <Eye className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={() => navigate(`/edit_items/${item.id}`)}
          className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
          title="Edit Item"
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={handleDelete}
          className="w-9 h-9 bg-gray-100 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors group"
          title="Delete Item"
        >
          <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors" />
        </button>

        <label className="relative inline-flex items-center cursor-pointer" title={item.is_available ? "Click to mark as Out of Stock" : "Click to mark as In Stock"}>
          <input
            type="checkbox"
            checked={item.is_available}
            onChange={handleStockToggle}
            disabled={isTogglingStock}
            className="sr-only peer"
          />
          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 ${isTogglingStock ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
        </label>
      </div>
    </div>
  );
};

export default ItemCard;