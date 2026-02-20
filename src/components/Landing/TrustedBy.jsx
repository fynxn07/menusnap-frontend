const TrustedBySection = () => {
    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-primary text-xs font-medium">
                    ⭐ Trusted Worldwide
                </div>

                <p className="mt-6 text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
                    Trusted by 500+ restaurants worldwide
                </p>


                <div className="mt-14 flex flex-wrap justify-center items-center gap-x-16 gap-y-10">

                    <div className="flex items-center gap-3 text-slate-600 text-lg font-semibold">
                        🍽️ <span>FineDine</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 text-lg font-semibold">
                        ☕ <span>UrbanCafe</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 text-lg font-semibold">
                        🥐 <span>FoodHub</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 text-lg font-semibold">
                        🍔 <span>BistroX</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 text-lg font-semibold">
                        🍷 <span>TasteCo</span>
                    </div>

                </div>


                <p className="mt-10 text-sm text-slate-500">
                    From cafés to fine-dining restaurants across multiple countries
                </p>

            </div>
        </section>
    );
};

export default TrustedBySection;
