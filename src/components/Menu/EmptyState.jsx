import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const EmptyState = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-900">Menu Management</h1>
                <button className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center">
                    <span className="text-lg">i</span>
                </button>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-700">Plan Limit</p>
                    <p className="text-sm text-gray-500">0 of 30 items used</p>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-emerald-500 font-semibold mt-2">0% Complete</p>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
                
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Plus className="w-8 h-8 text-emerald-500" />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                        Organize your menu by adding categories like Appetizers or Drinks.
                    </p>
                    
                    <button
                        onClick={() => navigate("/add_categories")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
                    >
                        Create Category
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Menu Items</h2>
                
                <div className="bg-white rounded-2xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-32 h-32 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                                </svg>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-lg shadow-lg">
                                <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your menu is empty</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Start by creating a category and adding your first dish to your QR menu.
                    </p>
                    
                    <div className="relative inline-block mb-6">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap">
                            Create a category first
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                        </div>
                    </div>
                    
                    <button
                        disabled
                        className="w-full max-w-sm bg-gray-200 text-gray-400 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                        <Plus className="w-5 h-5" />
                        Add Your First Item
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
                <div className="flex justify-around items-center max-w-screen-xl mx-auto">
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
                        <span className="text-xs">Analytics</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2z"/>
                        </svg>
                        <span className="text-xs">QR Preview</span>
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

export default EmptyState;