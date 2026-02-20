
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step3Tables = () => {
    const navigate=useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("access")) {
             navigate("/login");
        }
    }, []);

    const [totalTables, setTotalTables] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState([]);

    const handleCreateTables = async () => {
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:8080/restaurants/tables_create/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                    body: JSON.stringify({
                        total_tables: Number(totalTables),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(Object.values(data).flat().join(", "));
                return;
            }

            setTables(Array.isArray(data) ? data : []);
            console.log("TABLES STATE SET:", data);
        } catch {
            setError("Failed to create tables. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadAll = () => {
        console.log("Downloading all QR codes");
    };

    const handleDownloadSingle = (table) => {
        console.log("Downloading QR for table", table.table_number);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-green-200/30">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full">
                    <button
                        onClick={() => window.location.href = "/onboarding/branding"}
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-500/10 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-gray-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 text-gray-900">
                        Restaurant Onboarding
                    </h2>
                </div>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full pb-32">
                {/* Progress Bar Section */}
                <div className="flex flex-col gap-3 p-4">
                    <div className="flex gap-6 justify-between items-end">
                        <div className="flex flex-col">
                            <p className="text-green-600 text-xs font-semibold uppercase tracking-wider">
                                Step 3 of 4
                            </p>
                            <p className="text-gray-900 text-lg font-bold leading-normal">
                                Tables & QR Setup
                            </p>
                        </div>
                        <p className="text-green-600 text-sm font-medium leading-normal">
                            75% Complete
                        </p>
                    </div>
                    <div className="rounded-full bg-green-200 h-2.5 overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-green-600 text-xs font-medium">
                            Profile & Menu verified
                        </p>
                    </div>
                </div>

                <div className="px-4 pt-4">
                    <h3 className="text-gray-900 tracking-tight text-2xl font-bold leading-tight">
                        Generate QR Codes
                    </h3>
                    <p className="text-green-600 text-base font-normal leading-normal mt-2">
                        Enter the number of tables in your dining area to generate high-resolution unique QR codes.
                    </p>
                </div>

                {/* Numeric Input Field Section */}
                <div className="px-4 py-6">
                    <div className="bg-white p-5 rounded-xl border border-green-200 shadow-sm">
                        <label className="flex flex-col w-full">
                            <p className="text-gray-900 text-base font-semibold leading-normal pb-3">
                                Number of Tables
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex w-full flex-1 items-stretch rounded-lg shadow-inner">
                                    <input
                                        type="number"
                                        min="1"
                                        max="500"
                                        value={totalTables}
                                        onChange={(e) => setTotalTables(e.target.value)}
                                        placeholder="e.g. 25"
                                        className="form-input flex w-full min-w-0 flex-1 rounded-l-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500 border border-green-200 bg-green-50/30 h-14 placeholder:text-green-600/50 p-[15px] text-lg font-bold"
                                    />
                                    <div className="text-green-600 flex border border-green-200 bg-green-50/30 items-center justify-center px-4 rounded-r-lg border-l-0">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </label>

                        {/* ERROR */}
                        {error && (
                            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleCreateTables}
                            disabled={loading}
                            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                />
                            </svg>
                            {loading ? "Generating..." : "Generate QR Codes"}
                        </button>
                    </div>
                </div>

                {/* QR Preview Section */}
                {tables.length > 0 && (
                    <div className="px-4 pb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-gray-900 text-lg font-bold">
                                Preview ({Math.min(tables.length, tables.length)} of {tables.length})
                            </h4>
                            <button
                                onClick={handleDownloadAll}
                                className="text-green-500 text-sm font-semibold flex items-center gap-1 hover:text-green-600 transition-colors"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                Download All
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {tables.map((table) => (
                                <div
                                    key={table.id}
                                    className="bg-white p-4 rounded-xl border border-green-200 flex flex-col items-center text-center"
                                >
                                    <div className="w-full aspect-square bg-green-50/30 rounded-lg mb-3 flex items-center justify-center p-4 border border-dashed border-green-200">
                                        <img
                                            src={`http://localhost:8080${table.qr_code}`}
                                            alt={`QR Code for Table ${table.table_number}`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className="font-bold text-gray-900">
                                        Table {table.table_number}
                                    </p>
                                    <button
                                        onClick={() => handleDownloadSingle(table)}
                                        className="mt-2 text-green-600 hover:text-green-500 transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-green-200/30 p-4 pb-8">
                <div className="max-w-md mx-auto flex gap-4">
                    <button
                        onClick={() => navigate("/onboarding/branding")}
                        className="flex-1 px-6 py-4 rounded-xl border-2 border-green-200 text-gray-900 font-bold hover:bg-green-50 transition-all"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => navigate("/onboarding/finish")}
                        disabled={tables.length === 0}
                        className="flex-[2] px-6 py-4 rounded-xl bg-green-500 text-white font-bold shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Continue
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Step3Tables;