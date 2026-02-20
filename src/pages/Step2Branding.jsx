import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step2Branding = () => {
    const navigate=useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("access")) {
            navigate("/login");
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        logo: null,
        primary_color: "#2bee6c",
        secondary_color: "#0d1b12",
        theme: "light",
    });

    const handleFileChange = (e) => {
        setForm((prev) => ({
            ...prev,
            logo: e.target.files[0],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleContinue = async () => {
        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append("primary_color", form.primary_color);
        formData.append("secondary_color", form.secondary_color);
        formData.append("theme", form.theme);

        if (form.logo) {
            formData.append("logo", form.logo);
        }

        try {
            const res = await fetch(
                "http://localhost:8080/restaurants/onboarding_branding/",
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(Object.values(data).flat().join(", "));
                return;
            }

            window.location.href = "/onboarding/tables";

        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto min-h-screen flex flex-col pb-24 bg-gray-50">

            {/* TOP BAR */}
            <div className="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-10 shadow-sm">
                <button
                    onClick={() => window.location.href = "/onboarding/details"}
                    className="flex size-12 shrink-0 items-center justify-start text-gray-900"
                >
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
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
                    Restaurant Setup
                </h2>
            </div>

            {/* PROGRESS BAR */}
            <div className="flex flex-col gap-3 p-4 bg-white">
                <div className="flex gap-6 justify-between items-center">
                    <p className="text-gray-900 text-base font-medium leading-normal">
                        Step 2: Branding
                    </p>
                    <p className="text-gray-900 text-sm font-normal leading-normal">
                        2 / 4
                    </p>
                </div>
                <div className="rounded bg-green-200 overflow-hidden">
                    <div className="h-2 rounded bg-green-500" style={{ width: "50%" }}></div>
                </div>
                <div className="flex items-center gap-1">
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
                    <p className="text-green-600 text-sm font-normal leading-normal">
                        Step 1: Profile completed
                    </p>
                </div>
            </div>

            {/* HEADLINE & BODY */}
            <div className="px-4 pt-4">
                <h3 className="text-gray-900 tracking-tight text-2xl font-bold leading-tight pb-2">
                    Brand Identity
                </h3>
                <p className="text-gray-900 text-base font-normal leading-normal">
                    Upload your logo and choose colors to match your restaurant's theme.
                </p>
            </div>

            <div className="px-4 pt-6">
                <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight pb-3">
                    Restaurant Logo
                </h3>
                <label className="border-2 border-dashed border-green-200 rounded-xl p-8 flex flex-col items-center justify-center bg-white gap-2 cursor-pointer hover:border-green-300 transition-colors">
                    {form.logo ? (
                        <div className="flex flex-col items-center gap-2">
                            <img
                                src={URL.createObjectURL(form.logo)}
                                alt="Logo preview"
                                className="h-20 object-contain"
                            />
                            <p className="text-sm font-medium text-gray-900">
                                {form.logo.name}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-green-500/10 p-3 rounded-full">
                                <svg
                                    className="w-8 h-8 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                                Tap to upload logo
                            </p>
                            <p className="text-xs text-green-600">
                                PNG, JPG up to 2MB
                            </p>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        hidden
                    />
                </label>
            </div>

            <div className="px-4 pt-8">
                <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight pb-4">
                    Brand Colors
                </h3>
                <div className="flex flex-col gap-4">
                    {/* Primary Color */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center gap-3">
                            <div
                                className="size-10 rounded border border-gray-200"
                                style={{ backgroundColor: form.primary_color }}
                            ></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Primary Color
                                </p>
                                <p className="text-xs text-gray-500">
                                    {form.primary_color.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <label className="cursor-pointer">
                            <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                />
                            </svg>
                            <input
                                type="color"
                                name="primary_color"
                                value={form.primary_color}
                                onChange={handleChange}
                                className="sr-only"
                            />
                        </label>
                    </div>

                    {/* Secondary Color */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center gap-3">
                            <div
                                className="size-10 rounded border border-gray-200"
                                style={{ backgroundColor: form.secondary_color }}
                            ></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Secondary Color
                                </p>
                                <p className="text-xs text-gray-500">
                                    {form.secondary_color.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <label className="cursor-pointer">
                            <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                />
                            </svg>
                            <input
                                type="color"
                                name="secondary_color"
                                value={form.secondary_color}
                                onChange={handleChange}
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="px-4 pt-10">
                <div className="flex items-center justify-between pb-4">
                    <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">
                        Live Preview
                    </h3>
                    <span className="text-xs font-medium text-green-500 uppercase tracking-wider">
                        Mobile View
                    </span>
                </div>

                <div className="relative mx-auto w-full max-w-[280px] aspect-[9/16] rounded-[2.5rem] border-[8px] border-gray-800 bg-gray-100 overflow-hidden shadow-2xl">
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-800 rounded-b-2xl z-20"></div>

                    <div className="h-full w-full bg-white flex flex-col">
                        <div
                            className="h-40 w-full relative flex items-center justify-center overflow-hidden"
                            style={{ backgroundColor: form.primary_color }}
                        >
                            <div className="absolute inset-0 w-full h-full opacity-30 bg-gradient-to-b from-transparent to-black/20"></div>
                            <div className="relative z-10 size-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                {form.logo ? (
                                    <img
                                        src={URL.createObjectURL(form.logo)}
                                        alt="Logo"
                                        className="h-12 w-12 object-contain"
                                    />
                                ) : (
                                    <svg
                                        className="w-10 h-10 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Preview Content */}
                        <div className="p-4 flex-1">
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-1/2 bg-gray-100 rounded mb-6"></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <div className="aspect-square bg-gray-100 rounded-lg"></div>
                                    <div className="h-3 w-full bg-gray-100 rounded"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="aspect-square bg-gray-100 rounded-lg"></div>
                                    <div className="h-3 w-full bg-gray-100 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Preview Primary Button */}
                        <div className="p-4">
                            <div
                                className="h-10 w-full rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                                style={{ backgroundColor: form.primary_color }}
                            >
                                ORDER NOW
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="px-4 pt-4">
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                        {error}
                    </div>
                </div>
            )}

            {/* BOTTOM ACTIONS */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50/95 backdrop-blur-md border-t border-gray-200 max-w-md mx-auto z-30">
                <div className="flex gap-4 items-center">
                    <button
                        onClick={() =>  navigate("/onboarding/details")}
                        className="flex-1 py-3 text-gray-900 font-semibold text-base transition-colors hover:text-gray-700"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleContinue}
                        disabled={loading}
                        className="flex-[2] py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-base rounded-lg shadow-lg shadow-green-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step2Branding;