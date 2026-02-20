import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Step4Finish = () => {
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()

    const handleFinish = async () => {
        setLoading(true);

        try {
            await fetch(
                "http://localhost:8080/restaurants/complete_onboarding/",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                    credentials: "include",
                }
            );

            navigate("/dashboard");
        } catch {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="w-full h-12 flex items-center justify-between px-6 bg-gray-50">
                <span className="text-sm font-semibold text-gray-900">9:41</span>
                <div className="flex gap-1">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5z" />
                    </svg>
                </div>
            </div>

            <div className="w-full max-w-[430px] flex flex-col flex-1">
                {/* TopAppBar */}
                <div className="flex items-center p-4 pb-2 justify-between">
                    <button
                        onClick={() => navigate("/onboarding/tables")}
                        className="flex size-12 shrink-0 items-center justify-start text-gray-900"
                    >
                        <svg
                            className="w-5 h-5"
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
                    </button>
                    <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
                        Finish
                    </h2>
                </div>

                {/* ProgressBar (Onboarding Complete) */}
                <div className="flex flex-col gap-3 p-4">
                    <div className="flex gap-6 justify-between">
                        <p className="text-gray-900 text-base font-medium leading-normal">
                            Onboarding Complete
                        </p>
                        <p className="text-gray-900 text-sm font-normal leading-normal">
                            Step 4 of 4
                        </p>
                    </div>
                    <div className="rounded-full bg-green-200 overflow-hidden">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg
                            className="w-4 h-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-green-600 text-sm font-normal leading-normal">
                            All steps finished
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col px-4 pt-4">
                    <div className="flex justify-center py-6">
                        <div className="relative w-48 h-48 flex items-center justify-center bg-green-500/10 rounded-full">
                            <div className="absolute inset-0 bg-green-500/5 rounded-full animate-pulse"></div>
                            <svg
                                className="w-20 h-20 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {/* Sparkles decoration */}
                            <svg
                                className="absolute top-4 right-4 w-6 h-6 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                                className="absolute bottom-8 left-4 w-5 h-5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>

                    {/* HeadlineText */}
                    <h1 className="text-gray-900 tracking-tight text-[32px] font-bold leading-tight text-center pb-3 pt-4">
                        Your restaurant is ready!
                    </h1>
                    <p className="text-center text-gray-600 px-6 pb-8">
                        You've successfully set up your digital menu. Start receiving orders today.
                    </p>

                    {/* Summary Checklist Card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200/30">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-x-3 py-3 border-b border-green-200/20">
                                <svg
                                    className="w-6 h-6 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-gray-900 text-base font-medium leading-normal">
                                    Restaurant profile created
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3 py-3 border-b border-green-200/20">
                                <svg
                                    className="w-6 h-6 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-gray-900 text-base font-medium leading-normal">
                                    QR codes generated
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3 py-3">
                                <svg
                                    className="w-6 h-6 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-gray-900 text-base font-medium leading-normal">
                                    Dashboard ready
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA and Note */}
                    <div className="mt-auto py-8">
                        <button
                            onClick={handleFinish}
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{loading ? "Finishing..." : "Go to Dashboard"}</span>
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>
                        <p className="text-center text-xs text-gray-600 mt-4 leading-normal px-8">
                            You can update all of this later from your dashboard.
                        </p>
                    </div>
                </div>

                {/* iOS Home Indicator Safe Area */}
                <div className="w-full h-8 flex justify-center items-end pb-2">
                    <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default Step4Finish;