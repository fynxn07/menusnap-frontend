import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem, getCategories } from "../services/menuService";
import { Camera, ChevronDown, Save } from "lucide-react";
import imageCompression from "browser-image-compression";


const AddItem = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    is_veg: false,
    is_available: true,
    display_order: 1,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(file, options);

      
      const compressedFile = new File(
        [compressedBlob],
        file.name,             
        { type: compressedBlob.type }
      );

      setImageFile(compressedFile);
      setImagePreview(URL.createObjectURL(compressedFile));

    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      category: "",
      is_veg: false,
      is_available: true,
      display_order: 1,
    });
    setImagePreview(null);
    setImageFile(null);
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
        formData.append("image", imageFile);
      }

      await createItem(formData);

      navigate("/menu");

    } catch (error) {
      console.error(error);
      alert("Failed to save item");

    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-16 h-1.5 bg-emerald-300 rounded-full"></div>
      </div>

      
      <div className="bg-white px-6 pt-4 pb-6 rounded-t-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Item</h1>
          <button
            onClick={handleClearAll}
            className="text-emerald-500 font-semibold text-base hover:text-emerald-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-8 bg-emerald-50/30">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center">
                    <Camera className="w-10 h-10 text-emerald-600" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Food Photo</h3>
                <p className="text-emerald-600 text-sm mb-6">
                  High-quality JPG or PNG, max 5MB
                </p>

                <label className="inline-block">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl cursor-pointer inline-block transition-colors shadow-lg shadow-emerald-500/30">
                    Upload Image
                  </span>
                </label>
              </div>
            )}
          </div>

          
          <div>
            <label className="block text-gray-900 font-bold mb-3 text-base">
              Item Name
            </label>
            <input
              name="name"
              value={form.name}
              placeholder="e.g., Truffle Mushroom Risotto"
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 font-bold mb-3 text-base">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none text-gray-700 bg-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
            </div>
          </div>

          
          <div>
            <label className="block text-gray-900 font-bold mb-3 text-base">
              Price ($)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              placeholder="18.50"
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 font-bold mb-3 text-base">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              placeholder="Write a brief description of the dish..."
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
            />
          </div>

         
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="font-bold text-gray-900">Vegetarian</p>
              <p className="text-sm text-gray-500">Is this a vegetarian dish?</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_veg"
                checked={form.is_veg}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="font-bold text-gray-900">Available</p>
              <p className="text-sm text-gray-500">Is this item in stock?</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_available"
                checked={form.is_available}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-gray-900 font-bold mb-3 text-base">
              Display Order
            </label>
            <input
              name="display_order"
              type="number"
              value={form.display_order}
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
            />
            <p className="text-sm text-gray-500 mt-2">Lower numbers appear first</p>
          </div>

          
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg text-lg
  ${loading
                ? "bg-emerald-400 cursor-not-allowed shadow-none"
                : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
              }`}
          >
            {loading ? (
              <>
                <svg
                  className="w-6 h-6 animate-spin"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                Save Item
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="w-full text-emerald-500 hover:text-emerald-600 font-semibold py-3 transition-colors text-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;