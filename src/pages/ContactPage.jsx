import toast from "react-hot-toast";

const ContactPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully! 🚀");
        e.target.reset();
    };

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">

                <div className="max-w-2xl mb-16">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#0d1b12]">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-gray-500 text-lg">
                        Have questions about MenuSnap? Our team is happy to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    <div>
                        <h3 className="text-lg font-medium text-[#0d1b12]">
                            Get in touch
                        </h3>
                        <p className="mt-3 text-gray-500 max-w-md">
                            Reach out and we’ll respond as soon as possible.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-[#fafafa] border border-gray-200 rounded-2xl p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>

                            <div>
                                <label className="block text-sm font-medium text-[#0d1b12]">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="mt-2 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#0d1b12]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="mt-2 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#0d1b12]">
                                    Message
                                </label>
                                <textarea
                                    rows="5"
                                    required
                                    className="mt-2 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-[#0d1b12] py-3 rounded-full font-semibold text-sm hover:scale-[1.02] transition"
                            >
                                Send Message
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactPage;
