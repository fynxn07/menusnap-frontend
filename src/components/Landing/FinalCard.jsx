const FinalCard = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="relative rounded-2xl px-8 py-14 sm:px-12 text-center flex flex-col items-center gap-4
          bg-gradient-to-r from-[#4c9a66] via-[#6fbf8a] to-[#4c9a66] shadow-xl">

        
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b12] max-w-xl leading-tight">
            Ready to Go Paperless and Boost Sales?
          </h2>

          
          <p className="text-[#0d1b12]/70 text-sm sm:text-base font-medium max-w-lg">
            Join hundreds of restaurants delivering a faster and smarter dining experience.
          </p>

          
          <button className="mt-2 bg-[#0d1b12] text-white px-8 py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:scale-105 transition-transform">
            Get Started for Free
          </button>

          
          <p className="text-[#0d1b12]/50 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
            No credit card required • Cancel anytime
          </p>

        </div>

      </div>
    </section>
  );
};

export default FinalCard;
