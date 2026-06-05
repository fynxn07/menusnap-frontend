import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const JoinTable = () => {
  const navigate = useNavigate();

  const [manualCode, setManualCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinTable = async (e) => {
    e.preventDefault();

    if (!manualCode.trim()) {
      toast.error("Please enter a table code");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/restaurants/join-table/`,
        {
          manual_code: manualCode.toUpperCase(),
        }
      );

      toast.success("Table found!");

      navigate(
        `/menu/${data.restaurant_id}/${data.table_id}`
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Invalid table code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Join Your Table
          </h1>

          <p className="text-gray-500 mt-2">
            Enter the table code displayed near your QR code
          </p>
        </div>

        <form onSubmit={handleJoinTable}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table Code
            </label>

            <input
              type="text"
              value={manualCode}
              onChange={(e) =>
                setManualCode(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="e.g. 16CB5C"
              maxLength={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-xl font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Table"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Scan the QR code or enter the table code manually.
        </div>
      </div>
    </div>
  );
};

export default JoinTable;