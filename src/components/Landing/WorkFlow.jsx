import {
    UserPlus,
    ClipboardList,
    QrCode,
    ChefHat
} from "lucide-react";

const steps = [
    {
        title: "Register",
        description: "Create your restaurant account in minutes.",
        icon: UserPlus,
    },
    {
        title: "Create Menu",
        description: "Add items, images, prices, and categories.",
        icon: ClipboardList,
    },
    {
        title: "Scan & Order",
        description: "Guests scan the QR code and place orders.",
        icon: QrCode,
    },
    {
        title: "Kitchen Flow",
        description: "Track and manage orders in real time.",
        icon: ChefHat,
    },
];

const WorkflowSection = () => {
    return (
        <section id="workflow" className="bg-[#fafafa] py-28">
            <div className="max-w-7xl mx-auto px-6">


                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
                        How It Works
                    </h2>
                    <p className="mt-4 text-slate-600 text-lg">
                        A simple, streamlined process designed for modern restaurants.
                    </p>
                </div>


                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="text-center">

                                <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>


                                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                                    {index + 1}. {step.title}
                                </h3>


                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                    {step.description}
                                </p>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default WorkflowSection;
