const Footer = () => {
    return (
        <footer id="contact" className="bg-[#0f172a] text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">

                
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 text-white font-semibold text-lg">
                        <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            M
                        </span>
                        MenuSnap
                    </div>

                    <p className="mt-4 text-sm text-slate-400 max-w-xs">
                        The smart digital menu platform built for modern restaurants.
                    </p>
                </div>

                
                <div>
                    <h4 className="text-white font-medium mb-4">Product</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="#features" className="hover:text-white transition">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#pricing" className="hover:text-white transition">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#workflow" className="hover:text-white transition">
                                How it Works
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                
                <div>
                    <h4 className="text-white font-medium mb-4">Support</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a
                                href="/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://docs.menusnap.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                API Documentation
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://community.menusnap.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                Community
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                className="hover:text-white transition"
                            >
                                Email Support
                            </a>
                        </li>
                    </ul>
                </div>

                
                <div>
                    <h4 className="text-white font-medium mb-4">Legal</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a
                                href="https://menusnap.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://menusnap.com/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://menusnap.com/cookies"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                Cookie Policy
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="border-t border-slate-800 py-6">
                <p className="text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} MenuSnap. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
