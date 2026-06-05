import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurantTables } from "../services/tableApi";

const TableQR = () => {
    const navigate = useNavigate();

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const { data } = await getRestaurantTables();
            setTables(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = (table) => {
        const link = document.createElement("a");

        link.href =
            `https://menusnap-backend.onrender.com${table.qr_code}`;

        link.download = `table-${table.table_number}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Tables...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-xl"
                    >
                        ←
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Table Management
                        </h1>

                        <p className="text-sm text-gray-500">
                            View QR Codes & Manual Codes
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">

                <div className="mb-6">
                    <h2 className="text-lg font-semibold">
                        Total Tables: {tables.length}
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {tables.map((table) => (
                        <div
                            key={table.id}
                            className="bg-white rounded-2xl shadow-sm border p-4"
                        >
                            <img
                                src={`https://menusnap-backend.onrender.com${table.qr_code}`}
                                alt={`Table ${table.table_number}`}
                                className="w-full rounded-xl border"
                            />

                            <div className="mt-4 text-center">

                                <h3 className="font-bold text-lg">
                                    Table {table.table_number}
                                </h3>

                                <div className="mt-3">
                                    <p className="text-xs text-gray-500">
                                        Manual Code
                                    </p>

                                    <div className="bg-green-50 text-green-600 font-bold text-xl rounded-lg py-2 mt-1">
                                        {table.manual_code}
                                    </div>
                                </div>

                                <div className="mt-4 text-xs text-gray-500">
                                    Can't scan?
                                </div>

                                <div className="text-xs font-semibold text-green-600">
                                    menusnap-frontend.vercel.app/join
                                </div>

                                <button
                                    onClick={() => downloadQR(table)}
                                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                                >
                                    Download QR
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default TableQR;