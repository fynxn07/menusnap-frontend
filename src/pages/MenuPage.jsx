import { useEffect, useState } from "react";
import { getCategories, getItems, getMenuStats } from "../services/menuService";
import { useNavigate } from "react-router-dom";
import { Plus, Search, ChevronDown } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import StatsBar from "../components/Menu/StatsBar";
import CategoryTabs from "../components/Menu/CategoryTabs";
import ItemsList from "../components/Menu/ItemList";
import EmptyState from "../components/Menu/EmptyState";

const MenuManagement = () => {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("price");
    const [dietFilter, setDietFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if (activeCategory) fetchItems(activeCategory);
    }, [activeCategory]);

    const init = async () => {
        const [catRes, statsRes] = await Promise.all([
            getCategories(),
            getMenuStats(),
        ]);

        setCategories(catRes.data);
        setStats(statsRes.data);

        if (catRes.data.length > 0) {
            setActiveCategory(catRes.data[0].id);
        }
    };

    const fetchItems = async (catId) => {
        const res = await getItems(catId);
        setItems(res.data);
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesDiet = dietFilter === 'all' || 
                           (dietFilter === 'veg' && item.is_veg) || 
                           (dietFilter === 'non-veg' && !item.is_veg);
        
        return matchesSearch && matchesDiet;
    });

    // Sort items
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price;
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    if (categories.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Toaster
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Header */}
            <div className="bg-white sticky top-0 z-40 shadow-sm">
                <div className="flex items-center justify-between p-4">
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Menu Management</h1>
                    <button
                        onClick={() => navigate("/add_items")}
                        className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4">         
                <StatsBar stats={stats} />

                <CategoryTabs
                    categories={categories}
                    active={activeCategory}
                    setActive={setActiveCategory}
                    onAddCategory={() => navigate("/add_categories")}
                />

                {/* Search Bar */}
                <div className="bg-emerald-50 rounded-xl p-3 flex items-center gap-3">
                    <Search className="w-5 h-5 text-emerald-600" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-emerald-400"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-emerald-600 hover:text-emerald-700"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 hover:border-emerald-500 transition-colors text-sm font-medium text-gray-700 outline-none"
                    >
                        <option value="price">Sort by: Price</option>
                        <option value="name">Sort by: Name</option>
                    </select>
                    
                    <select
                        value={dietFilter}
                        onChange={(e) => setDietFilter(e.target.value)}
                        className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 hover:border-emerald-500 transition-colors text-sm font-medium text-gray-700 outline-none"
                    >
                        <option value="all">Diet: All</option>
                        <option value="veg">Diet: Vegetarian</option>
                        <option value="non-veg">Diet: Non-Veg</option>
                    </select>
                </div>

                {searchQuery && (
                    <p className="text-sm text-gray-600">
                        Found {sortedItems.length} item(s) matching "{searchQuery}"
                    </p>
                )}

                
                <ItemsList 
                    items={sortedItems} 
                    refresh={() => fetchItems(activeCategory)} 
                />

                {sortedItems.length === 0 && searchQuery && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No items found</p>
                        <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
                <div className="flex justify-around items-center max-w-screen-xl mx-auto">
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
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
                    
                    <button 
                        onClick={() => navigate("/orders")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs">Orders</span>
                    </button>
                    
                    <button 
                        onClick={() => navigate("/analytics")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-xs">Analytics</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuManagement;