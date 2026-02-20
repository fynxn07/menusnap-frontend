// import { useState } from "react";
// import { requestOTP } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// const RequestOTP = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const styles = {
//     container: { textAlign: "center", marginTop: 100 },
//     input: { padding: 10, width: 250, marginBottom: 20 },
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await requestOTP(email);
//       navigate("/verify-otp", { state: { email } });
//     } catch (error) {
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Forgot Password</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RequestOTP;

import { useState } from "react";
import { requestOTP } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, ArrowRight, LogIn } from "lucide-react";

const RequestOTP = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestOTP(email);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-slate-100 flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
            <Lock className="w-16 h-16 text-orange-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Forgot Password?
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Enter your registered email address and we will send you a 6-digit OTP code to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-base">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="name@restaurant.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            <span className="text-lg">{loading ? "Sending..." : "Send OTP"}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-6 text-orange-500 hover:text-orange-600 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          <span>Back to Login</span>
        </button>
      </div>
    </div>
  );
};

export default RequestOTP;
