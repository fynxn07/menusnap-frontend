const PricingSection = () => {
    const goToRegister = (plan) => {
        window.location.href = `/register?plan=${plan}`;
    };

    return (
        <section id="pricing" className="bg-[#f7f8f6] py-32">
            <div className="max-w-6xl mx-auto px-6">

                <div className="text-center max-w-xl mx-auto">
                    <h2 className="text-3xl font-semibold text-slate-900">
                        Simple, transparent pricing
                    </h2>
                    <p className="mt-3 text-slate-600 text-base">
                        Choose the plan that fits your restaurant scale.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
                    
                    <div className="rounded-2xl bg-white p-8 border">
                        <h3 className="text-slate-800 font-medium">Basic</h3>

                        <p className="mt-4 text-4xl font-semibold text-slate-900">
                            ₹0
                            <span className="text-base text-slate-500"> / month</span>
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-slate-600">
                            <li>✔ Up to 50 items</li>
                            <li>✔ Standard QR Code</li>
                            <li className="text-slate-400">✖ No Analytics</li>
                        </ul>

                        <button
                            onClick={() => goToRegister("basic")}
                            className="mt-8 w-full py-2.5 rounded-xl border text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Start Free
                        </button>
                    </div>

                    <div className="relative rounded-3xl bg-white p-8 border-2 border-green-500 shadow-xl scale-105">

                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-100 text-primary text-xs font-semibold px-4 py-1 rounded-full">
                            MOST POPULAR
                        </span>

                        <h3 className="text-primary font-medium">Pro</h3>

                        <p className="mt-4 text-4xl font-semibold text-slate-900">
                            ₹2,499
                            <span className="text-base text-slate-500"> / month</span>
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-slate-700">
                            <li>✔ Unlimited items</li>
                            <li>✔ Custom Branding</li>
                            <li>✔ Advanced Analytics</li>
                            <li>✔ Table Management</li>
                        </ul>

                        <button
                            onClick={() => goToRegister("pro")}
                            className="mt-8 w-full py-2.5 rounded-xl bg-green-400 text-sm font-medium text-slate-800 hover:bg-green-300"
                        >
                            Get Started
                        </button>
                    </div>

                    <div className="rounded-2xl bg-white p-8 border">
                        <h3 className="text-slate-800 font-medium">Enterprise</h3>

                        <p className="mt-4 text-4xl font-semibold text-slate-900">
                            ₹4,999
                            <span className="text-base text-slate-500"> / month</span>
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-slate-600">
                            <li>✔ All Pro features</li>
                            <li>✔ POS Integration</li>
                            <li>✔ Priority Support</li>
                        </ul>

                        <button

                            className="mt-8 w-full py-2.5 rounded-xl border text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Contact Sales
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default PricingSection;
