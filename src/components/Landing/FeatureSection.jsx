const features = [
    {
        emoji: "🔄",
        title: "Real-time Updates",
        desc: "Sold out of the daily special? Update your menu in seconds, not hours.",
    },
    {
        emoji: "🌐",
        title: "Multilingual Support",
        desc: "Automatically translate your menu for international tourists.",
    },
    {
        emoji: "📊",
        title: "Detailed Analytics",
        desc: "See which dishes are your best sellers and optimize your margins.",
    },
    {
        emoji: "💳",
        title: "Instant Payments",
        desc: "Accept Apple Pay, Google Pay, and cards directly from the table.",
    },
    {
        emoji: "🍳",
        title: "Kitchen Display",
        desc: "Eliminate paper tickets with our integrated kitchen workflow system.",
    },
    {
        emoji: "⚠️",
        title: "Allergen Filters",
        desc: "Keep guests safe with easy-to-use dietary and allergen tagging.",
    },
];

const FeaturesSection = () => {
    return (
        <section id='features' className="bg-[#f8f9fb] py-28">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
                        Everything you need to succeed
                    </h2>
                    <p className="mt-4 text-slate-600 text-lg">
                        Powerful features designed to streamline your operations and delight your guests.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border bg-white p-8 hover:shadow-lg transition"
                        >
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                                {item.emoji}
                            </div>

                            <h3 className="mt-6 font-semibold text-slate-900">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;
