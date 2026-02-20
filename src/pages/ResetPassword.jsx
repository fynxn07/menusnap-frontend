// import { useState } from "react";
// import { resetPassword } from "../services/authService";
// import { useLocation, useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const token = location.state?.token;

//   const styles = {
//     container: { textAlign: "center", marginTop: 100 },
//     input: { padding: 10, width: 250, marginBottom: 20 },
//   };

//   if (!token) return <p>Session expired. Restart process.</p>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirm) {
//       alert("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       await resetPassword(token, password);

//       alert("Password reset successful");
//       navigate("/login");
//     } catch (error) {
//       alert("Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Reset Password</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />

//         <input
//           type="password"
//           placeholder="Confirm password"
//           required
//           value={confirm}
//           onChange={(e) => setConfirm(e.target.value)}
//           style={styles.input}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Updating..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { Key, Eye, EyeOff, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = location.state?.token;

  // Password strength calculator
  const getPasswordStrength = () => {
    if (!password) return { label: "", percentage: 0, color: "" };

    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    
    // Has lowercase
    if (/[a-z]/.test(password)) strength += 15;
    
    // Has uppercase
    if (/[A-Z]/.test(password)) strength += 15;
    
    // Has number
    if (/\d/.test(password)) strength += 15;
    
    // Has special character
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

    if (strength <= 35) {
      return { label: "WEAK", percentage: 25, color: "bg-red-500" };
    } else if (strength <= 60) {
      return { label: "MEDIUM", percentage: 50, color: "bg-yellow-500" };
    } else if (strength <= 85) {
      return { label: "STRONG", percentage: 75, color: "bg-orange-500" };
    } else {
      return { label: "VERY STRONG", percentage: 100, color: "bg-green-500" };
    }
  };

  const strength = getPasswordStrength();

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <p className="text-gray-900 font-semibold mb-4">Session expired. Restart process.</p>
          <button
            onClick={() => navigate("/request-otp")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Restart Process
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, password);
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-slate-100 flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Key Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
            <Key className="w-16 h-16 text-orange-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Reset Password
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Create a new, strong password for your account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-base">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Password Strength
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wide ${
                    strength.label === "WEAK" ? "text-red-500" :
                    strength.label === "MEDIUM" ? "text-yellow-500" :
                    strength.label === "STRONG" ? "text-orange-500" :
                    "text-green-500"
                  }`}>
                    {strength.label}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[25, 50, 75, 100].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        strength.percentage >= level ? strength.color : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-base">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Update Password Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/30 text-lg
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-6 text-gray-500 hover:text-gray-700 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </button>

        {/* Footer Branding */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
            <span className="text-sm font-semibold">RESTOOS SAAS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
