import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../services/menuService";
import { X, UtensilsCrossed, Pizza, Leaf, Wine, Utensils, Soup, IceCream, Coffee } from "lucide-react";
import toast from 'react-hot-toast';

const AddCategory = () => {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("burger");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const icons = [
    { id: "burger", name: "Burger", Icon: UtensilsCrossed },
    { id: "pizza", name: "Pizza", Icon: Pizza },
    { id: "leaf", name: "Vegetarian", Icon: Leaf },
    { id: "cocktail", name: "Drinks", Icon: Wine },
    { id: "utensils", name: "Dining", Icon: Utensils },
    { id: "bowl", name: "Bowl", Icon: Soup },
    { id: "icecream", name: "Dessert", Icon: IceCream },
    { id: "coffee", name: "Beverages", Icon: Coffee },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      await createCategory({
        name: name.trim(),
        icon: selectedIcon,
        display_order: 1,
        is_active: isActive,
      });

      
      navigate("/menu");
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
      console.error("Create category error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-16 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="px-6 pt-4 pb-6 flex items-center justify-between">
          <button 
            onClick={() => navigate("/menu")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
            Add New Category
          </h1>
          <div className="w-10"></div> 
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-8">
          
          <div>
            <label className="block text-base font-bold text-gray-900 mb-3">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Main Course"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-900 mb-4">
              Icon Selection
            </label>
            <div className="grid grid-cols-4 gap-4">
              {icons.map((icon) => {
                const IconComponent = icon.Icon;
                return (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setSelectedIcon(icon.id)}
                    className={`
                      aspect-square rounded-2xl flex items-center justify-center transition-all
                      ${selectedIcon === icon.id 
                        ? 'bg-emerald-100 border-2 border-emerald-500 shadow-lg scale-105' 
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                      }
                    `}
                    title={icon.name}
                  >
                    <IconComponent 
                      className={`w-10 h-10 ${selectedIcon === icon.id ? 'text-gray-900' : 'text-gray-600'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Active Status</h3>
              <p className="text-sm text-gray-500">Category will be visible on menu</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="space-y-3 pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-500/30 text-lg"
            >
              Create Category
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="w-full text-gray-600 hover:text-gray-800 font-semibold py-3 transition-colors text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;