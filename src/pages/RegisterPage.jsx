import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [plan, setPlan] = useState("pro");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate=useNavigate()

    const [form, setForm] = useState({
        owner_name: "",
        restaurant_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        terms: false,
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const selectedPlan = params.get("plan");
        if (selectedPlan) setPlan(selectedPlan);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleContinue = async (e) => {
        e.preventDefault();
        setError(null);

        if (!form.terms) {
            setError("Please accept Terms & Privacy Policy");
            return;
        }

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:8080/auth/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        owner_name: form.owner_name,
                        restaurant_name: form.restaurant_name,
                        email: form.email,
                        phone: form.phone,
                        password: form.password,
                        confirm_password: form.confirm_password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(
                    typeof data === "string"
                        ? data
                        : Object.values(data).flat().join(", ")
                );
                return;
            }

            localStorage.setItem("selected_plan", plan);
            navigate("/login");

        } catch (err) {
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50 overflow-x-hidden font-display">
            <div className="fixed top-0 right-0 -z-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
            <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

            {/* Top Navigation */}
            <div className="flex items-center bg-white p-4 pb-2 justify-between shadow-sm sticky top-0 z-10">
                <div 
                onClick={()=>navigate('/')}
                className="flex size-12 shrink-0 items-center justify-start cursor-pointer text-gray-900" >
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
                </div>
                <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
                    Create Account
                </h2>
                <div className="size-12 shrink-0"></div>
            </div>

            <div className="flex flex-col w-full max-w-[480px] mx-auto pb-10">
                {/* Plan Summary Card */}
                <div className="p-4">
                    <div className="flex flex-col items-stretch justify-start rounded-xl border-2 border-green-500/30 shadow-sm bg-white">
                        <div className="flex w-full grow flex-col items-stretch justify-center gap-1 p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-gray-900 text-lg font-bold leading-tight tracking-tight capitalize">
                                        {plan} Plan
                                    </p>
                                    <p className="text-green-500 text-sm font-semibold uppercase tracking-wider">
                                        Active Selection
                                    </p>
                                </div>
                                <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-8 px-4 bg-green-500/10 text-green-600 text-xs font-bold hover:bg-green-500/20 transition-colors">
                                    <span className="truncate">Change</span>
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex items-center gap-2 text-green-600">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="text-sm font-normal">Unlimited Products & Orders</p>
                                </div>
                                <div className="flex items-center gap-2 text-green-600">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="text-sm font-normal">Real-time Ordering & Analytics</p>
                                </div>
                                <div className="flex items-center gap-2 text-green-600">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="text-sm font-normal">QR Customization</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <h2 className="text-gray-900 tracking-tight text-[28px] font-bold leading-tight pb-2 pt-4">
                        Create Your  Account
                    </h2>
                    <p className="text-green-600 text-base font-normal leading-normal pb-6">
                        Join thousands of restaurant owners managing their business with ease.
                    </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleContinue} className="flex flex-col gap-1">
                    {/* Full Name */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-gray-900 text-sm font-medium leading-normal pb-2">
                                Full Name
                            </p>
                            <input
                                name="owner_name"
                                type="text"
                                value={form.owner_name}
                                onChange={handleChange}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-green-200 bg-white h-14 placeholder-gray-500 p-[15px] text-base font-normal"
                                placeholder="Enter your full name"
                            />
                        </label>
                    </div>

                    
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-gray-900 text-sm font-medium leading-normal pb-2">
                                Restaurant Name
                            </p>
                            <input
                                name="restaurant_name"
                                type="text"
                                value={form.restaurant_name}
                                onChange={handleChange}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-green-200 bg-white h-14 placeholder-gray-500 p-[15px] text-base font-normal"
                                placeholder="e.g. Green Leaf Kitchen"
                            />
                        </label>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-gray-900 text-sm font-medium leading-normal pb-2">
                                Email Address
                            </p>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-green-200 bg-white h-14 placeholder-gray-500 p-[15px] text-base font-normal"
                                placeholder="name@gmail.com"
                            />
                        </label>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-gray-900 text-sm font-medium leading-normal pb-2">
                                Mobile Number
                            </p>
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-green-200 bg-white h-14 placeholder-gray-500 p-[15px] text-base font-normal"
                                placeholder="+91 0000-0000"
                            />
                        </label>
                    </div>

                    {/* Password */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-gray-900 text-sm font-medium leading-normal pb-2">
                                Password
                            </p>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-green-200 bg-white h-14 placeholder-gray-500 p-[15px] text-base font-normal"
                                placeholder="Min. 8 characters"
                            />
                        </label>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-gray-900 text-sm font-medium leading-normal pb-2">
                                Confirm Password
                            </p>
                            <input
                                name="confirm_password"
                                type="password"
                                value={form.confirm_password}
                                onChange={handleChange}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-green-200 bg-white h-14 placeholder-gray-500 p-[15px] text-base font-normal"
                                placeholder="Confirm your password"
                            />
                        </label>
                    </div>

                    {/* Terms & Privacy */}
                    <div className="flex items-start gap-3 px-4 py-4">
                        <input
                            name="terms"
                            type="checkbox"
                            checked={form.terms}
                            onChange={handleChange}
                            className="size-5 rounded border-green-200 text-green-500 focus:ring-green-500 mt-0.5 cursor-pointer"
                        />
                        <p className="text-gray-900 text-sm leading-normal">
                            I agree to the{" "}
                            <a className="text-green-500 font-medium underline" href="#">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a className="text-green-500 font-medium underline" href="#">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>

                    {error && (
                        <div className="px-4 py-2">
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        </div>
                    )}

                    <div className="px-4 py-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-green-500 hover:bg-green-600 text-white text-base font-bold leading-normal shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="truncate">
                                {loading ? "Creating Account..." : "Continue"}
                            </span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="flex justify-center items-center py-6">
                        <p className="text-gray-900 text-base font-normal">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-green-500 font-bold ml-1 hover:text-green-600 transition-colors"
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;