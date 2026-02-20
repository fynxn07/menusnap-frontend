// import { useState } from "react";
// import { verifyOTP } from "../services/authService";
// import { useLocation, useNavigate } from "react-router-dom";

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const email = location.state?.email;

//   const styles = {
//     container: { textAlign: "center", marginTop: 100 },
//     input: { padding: 10, width: 250, marginBottom: 20 },
//   };

//   if (!email) return <p>Email missing. Go back.</p>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await verifyOTP(email, otp);
//       const token = res.data.session_token;

//       navigate("/reset-password", {
//         state: { token },
//       });
//     } catch (error) {
//       alert(error.response?.data?.detail || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Verify OTP</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter 6-digit OTP"
//           required
//           maxLength={6}
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           style={styles.input}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Verifying..." : "Verify OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VerifyOTP;


import { useState, useRef } from "react";
import { verifyOTP, requestOTP } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <p className="text-gray-900 font-semibold mb-4">Email missing. Go back.</p>
          <button
            onClick={() => navigate("/request-otp")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOTP(email, otpString);
      const token = res.data.session_token;

      toast.success("OTP verified successfully!");
      navigate("/reset-password", {
        state: { token },
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await requestOTP(email);
      toast.success("OTP sent successfully!");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-slate-100 flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Mail Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
            <Mail className="w-16 h-16 text-orange-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Verify OTP
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          We have sent a 6-digit code to your email. Please enter it below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 transition-all"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className={`
              w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30 text-lg
              ${(loading || otp.join("").length !== 6) ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        {/* Resend Code */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 inline">
            Didn't receive the code?{" "}
          </p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-orange-500 hover:text-orange-600 font-semibold transition-colors inline"
          >
            {resending ? "Sending..." : "Resend Code"}
          </button>
        </div>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-6 text-gray-500 hover:text-gray-700 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;