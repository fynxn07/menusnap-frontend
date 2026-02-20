
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step1Details = () => {
    const navigate=useNavigate()
    
    useEffect(() => {
        if (!localStorage.getItem("access")) {
            navigate("/login");
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        name: "",
        restaurant_type: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleContinue = async () => {
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:8080/restaurants/onboarding_details/",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(Object.values(data).flat().join(", "));
                return;
            }
            
            navigate("/onboarding/branding");

        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto flex flex-col min-h-screen bg-gray-50">

            {/* TOP BAR */}
            <div className="flex items-center bg-white p-4 pb-2 justify-between shadow-sm">
                <button
                    onClick={() => window.location.href = "/login"}
                    className="flex size-12 shrink-0 items-center justify-start cursor-pointer text-gray-900"
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
                    Onboarding
                </h2>
            </div>

            {/* STEPPER */}
            <div className="px-6 py-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                    <StepCircle number="1" label="Details" active />
                    <StepDivider />
                    <StepCircle number="2" label="Branding" />
                    <StepDivider />
                    <StepCircle number="3" label="Tables" />
                    <StepDivider />
                    <StepCircle number="4" label="Finish" />
                </div>
            </div>

            {/* CONTENT */}
            <main className="flex-1 px-4 pb-8 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                    <h3 className="text-gray-900 tracking-tight text-2xl font-bold leading-tight text-center pb-2">
                        Set Up Your Restaurant
                    </h3>

                    <p className="text-gray-600 text-sm font-normal leading-normal pb-6 text-center">
                        Tell us a bit about your business to get started with your digital menu.
                    </p>

                    <div className="space-y-4">

                        <Input
                            label="Restaurant Name"
                            name="name"
                            placeholder="e.g. The Green Bistro"
                            value={form.name}
                            onChange={handleChange}
                        />

                        {/* Restaurant Type */}
                        <div className="flex flex-col w-full">
                            <Label>Restaurant Type</Label>
                            <div className="relative">
                                <select
                                    name="restaurant_type"
                                    value={form.restaurant_type}
                                    onChange={handleChange}
                                    className="form-select w-full rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/30 border border-gray-200 bg-white h-12 p-[15px] text-sm font-normal appearance-none"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="CASUAL">Casual Dining</option>
                                    <option value="FINE">Fine Dining</option>
                                    <option value="FAST">Fast Food</option>
                                    <option value="CAFE">Cafe / Bakery</option>
                                    <option value="BAR">Bar / Pub</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
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
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Phone + Email */}
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Phone"
                                name="phone"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="contact@bistro.com"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <Input
                            label="Full Address"
                            name="address"
                            placeholder="123 Culinary Ave"
                            value={form.address}
                            onChange={handleChange}
                        />

                        {/* City / State / Country */}
                        <div className="grid grid-cols-3 gap-3">
                            <Input
                                label="City"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                            />
                            <Input
                                label="State"
                                name="state"
                                placeholder="ST"
                                value={form.state}
                                onChange={handleChange}
                            />
                            <Input
                                label="Country"
                                name="country"
                                placeholder="USA"
                                value={form.country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mt-4">
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        </div>
                    )}

                    {/* ACTIONS */}
                    <div className="mt-8 space-y-4">
                        <button
                            onClick={handleContinue}
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Continue"}
                        </button>

                        <button
                            onClick={() => navigate("/onboarding/branding")}
                            className="w-full text-gray-500 font-medium text-sm py-2 hover:text-gray-700 transition-colors"
                        >
                            Skip for now
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex justify-center opacity-50">
                    <div className="w-48 h-1 rounded-full bg-gray-300"></div>
                </div>
            </main>

            <div className="h-6" />
        </div>
    );
};

export default Step1Details;

/* ---------- UI HELPERS ---------- */

const Label = ({ children }) => (
    <p className="text-gray-900 text-sm font-medium leading-normal pb-1.5">
        {children}
    </p>
);

const Input = ({ label, ...props }) => (
    <div className="flex flex-col w-full">
        <Label>{label}</Label>
        <input
            {...props}
            className="form-input flex w-full rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/30 border border-gray-200 bg-white h-12 placeholder:text-gray-400 p-[15px] text-sm font-normal"
        />
    </div>
);

const StepCircle = ({ number, label, active }) => (
    <div className="flex flex-col items-center flex-1">
        <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${active
                    ? "bg-green-500 text-white ring-4 ring-green-500/20"
                    : "bg-gray-200 text-gray-500"
                }`}
        >
            {number}
        </div>
        <span
            className={`text-[10px] mt-1 font-semibold ${active ? "text-green-500" : "text-gray-400"
                }`}
        >
            {label}
        </span>
    </div>
);

const StepDivider = () => (
    <div className="h-[2px] flex-1 bg-gray-200 -mt-4" />
);