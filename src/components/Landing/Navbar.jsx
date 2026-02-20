import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-semibold tracking-tight">
            MenuSnap
          </span>
        </div>


        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-black transition">Features</a>
          <a href="#workflow" className="hover:text-black transition">How it works</a>
          <a href="#pricing" className="hover:text-black transition">Pricing</a>
          <a href="#contact" className="hover:text-black transition">Contact</a>
        </nav>


        <div className="hidden md:flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-gray-600 hover:text-black">
            Login
          </a>
          <a href="/register" className=" btn-primary text-sm">
            Get Started
          </a>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {
        open && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-gray-700">

              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="hover:text-black"
              >
                Features
              </a>

              <a
                href="#workflow"
                onClick={() => setOpen(false)}
                className="hover:text-black"
              >
                How it works
              </a>

              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="hover:text-black"
              >
                Pricing
              </a>

              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="hover:text-black"
              >
                Contact
              </a>

              <div className="pt-4 border-t flex flex-col gap-3">
                <button className="text-left text-sm font-medium text-gray-600 hover:text-black">
                  Login
                </button>
                <a href='/register' className="btn-primary text-sm w-full">
                  Get Started
                </a>
              </div>

            </nav>
          </div>
        )
      }
    </header >
  );
};

export default NavBar;
