const HeaderSection = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <div className="@container">
        <div className="flex flex-col gap-16 px-6 py-20 @[900px]:flex-row @[900px]:items-center">


          <div className="flex flex-col gap-7 @[900px]:flex-[0.9]">


            <div className="flex flex-col gap-4 text-left">
              <span className="bg-primary/15 text-primary px-4 py-1 rounded-full text-[11px] font-semibold w-fit tracking-wide">
                NOW LIVE
              </span>

              <h1 className="text-[#0d1b12] text-3xl @[480px]:text-4xl @[768px]:text-5xl font-extrabold leading-tight tracking-tight">
                Smart QR Menus for <br /> Modern Restaurants
              </h1>

              <p className="text-[#4c5a50] text-base @[768px]:text-lg leading-relaxed max-w-xl">
                Reduce costs, eliminate paper, and increase table turnover with a
                premium contactless dining experience your customers will love.
              </p>
            </div>


            <div className="flex flex-wrap gap-4 pt-2">
              <button className="flex-1 sm:flex-none min-w-[160px] h-13 px-8 rounded-full bg-primary text-[#0d1b12] text-sm font-semibold shadow-md hover:scale-105 transition-transform">
                Start Free Trial
              </button>

              <button className="flex-1 sm:flex-none min-w-[160px] h-13 px-8 rounded-full bg-[#e7f3eb] text-[#0d1b12] text-sm font-semibold border border-transparent hover:border-primary/40 transition-all">
                View Demo
              </button>
            </div>
          </div>


          <div className="w-full @[900px]:flex-[1.1] relative flex justify-center">


            <div
              className="w-full max-w-[420px] aspect-[4/5] rounded-2xl shadow-2xl overflow-hidden border-8 border-white bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmcyNO9f59y97hu4yhL_ICWXbQP0cNLGsMf-KVbx9mAdweNAB-5JBwG-0TOrDW4Jld9wyw4t_kmjUVw6DIW0B40e9I-mvBOWwbStDF9W80p4I-53yAMMsP21craXa82aNCt8M-FRIjCVQHLZX-gQAvJGKG_UeIR4kkT4FQzvCmv-BnFsxm7aa-wXYNTcHUtfl0iUYL5b2iNwIhf2mFsnkILa_ds57f_xbSmQ0f_Ue6UjxUqswutQNuqE9Xd3sDYo_HvNyCiiPKdJRG")',
              }}
              aria-label="Mobile menu preview"
            />


          </div>

        </div>
      </div>
    </main>
  );
};

export default HeaderSection;
