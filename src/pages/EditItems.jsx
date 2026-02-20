import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getItem, updateItem } from "../services/menuService";
import { ArrowLeft, Camera, ChevronDown, Package, Leaf } from "lucide-react";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [itemRes, catRes] = await Promise.all([
      getItem(id),
      getCategories(),
    ]);

    setForm(itemRes.data);
    setCategories(catRes.data);

    if (itemRes.data.image) {
      setImagePreview(itemRes.data.image);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }

      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        alert("Only JPG and PNG files are allowed");
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("is_veg", form.is_veg);
      formData.append("is_available", form.is_available);
      formData.append("display_order", form.display_order);

      if (imageFile) {
        formData.append("image", imageFile); // ⭐ important
      }

      await updateItem(id, formData);

      navigate("/menu");

    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Discard all changes?")) {
      navigate("/menu");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/menu")}
            className="p-1"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              MENU / {form.category_name || "STARTERS"}
            </p>
            <h1 className="text-lg font-bold text-gray-900">
              Edit {form.name}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="text-emerald-500 font-semibold text-base hover:text-emerald-600 transition-colors"
        >
          Save
        </button>
      </div>

      <form onSubmit={handleSubmit} className="px-4 pt-6 space-y-6">
        {/* Image Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt={form.name}
              className="w-full h-56 object-cover"
            />
          ) : (
            <div className="w-full h-56 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-20 h-20 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500 text-sm font-medium">No image uploaded</p>
              </div>
            </div>
          )}

          {imagePreview && <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>}

          <label className="absolute inset-0 flex items-center justify-center cursor-pointer group">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="text-center transform transition-all duration-200 group-hover:scale-105">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-2xl transition-shadow">
                <Camera className="w-8 h-8 text-emerald-500" />
              </div>
              <span className="text-white font-bold text-base drop-shadow-lg">Update Image</span>
            </div>
          </label>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Details</h2>

          {/* Item Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name
            </label>
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={form.category || ""}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none text-gray-900"
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price || ""}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows="4"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-gray-900"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Advanced Settings</h2>

          {/* In Stock Toggle */}
          <div className="bg-white rounded-xl p-4 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-semibold text-gray-900">In Stock</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_available"
                checked={form.is_available ?? true}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Vegetarian Toggle */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-semibold text-gray-900">Vegetarian</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_veg"
                checked={form.is_veg || false}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Display Order
          </label>
          <input
            name="display_order"
            type="number"
            value={form.display_order || 1}
            onChange={handleChange}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
          />
          <p className="text-xs text-gray-500 mt-1.5">Lower numbers appear first in the menu</p>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 space-y-3 z-50">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg
  ${loading
              ? "bg-emerald-400 cursor-not-allowed shadow-none"
              : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
            }`}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
              Saving...
            </>
          ) : (
            "Save Updates"
          )}
        </button>

        <button
          type="button"
          onClick={handleDiscard}
          className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Discard Change
        </button>
      </div>
    </div>
  );
};

export default EditItem;