// import { createContext, useContext, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const navigate = useNavigate(); 
//     const [accessToken, setAccessToken] = useState(
//         localStorage.getItem("access")
//     );

//     const login = async (email, password) => {
//     try{
//         const res = await api.post("/auth/login/", {
//             email,
//             password,
//         });

//         const access = res.data.access;

//         localStorage.setItem("access", access);
//         setAccessToken(access);

//         const decoded = jwtDecode(access);

//         return decoded;
//     }   catch (err) {
//         const message =
//             err.response?.data?.detail ||
//             "Login failed. Please try again.";

//         throw new Error(message);
//     }
// };

//     const fetchProfile = async () => {
//         const res = await api.get("/auth/profile/", {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//         });
//         return res.data;
//     };

//     /* 🚪 LOGOUT */
//     const logout = async () => {
//         localStorage.removeItem("access");
//         setAccessToken(null);

//         await api.post("/auth/logout/");
//         navigate("/login", { replace: true }); 
//     };

//     const handleGoogleLogin = async () => {
//         try {
//             const res = await api.get("/auth/google/login/");
//             const { auth_url } = res.data;

//             const link = document.createElement("a");
//             link.href = auth_url;
//             link.rel = "noopener noreferrer";
//             link.click();
//         } catch (err) {
//             console.error("Google login failed");
//         }
//     };


//     return (
//         <AuthContext.Provider
//             value={{
//                 accessToken,
//                 setAccessToken,
//                 login,
//                 fetchProfile,
//                 logout,
//                 handleGoogleLogin,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);


import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access")
  );

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  /* ================= LOGIN ================= */

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login/", {
        email,
        password,
      });

      const access = res.data.access;

      localStorage.setItem("access", access);
      setAccessToken(access);

      const decoded = jwtDecode(access);

      // Load profile immediately after login
      await fetchProfile();

      return decoded;
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        "Login failed. Please try again.";

      throw new Error(message);
    }
  };

  /* ================= FETCH PROFILE ================= */

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile/");
      setProfile(res.data);
      return res.data;
    } catch (err) {
      console.error("Profile fetch failed");
      logout();
    } finally {
      setLoadingProfile(false);
    }
  };

  /* ================= LOAD PROFILE ON APP START ================= */

  useEffect(() => {
    if (accessToken) {
      fetchProfile();
    } else {
      setLoadingProfile(false);
    }
  }, [accessToken]);

  /* ================= LOGOUT ================= */

  const logout = async () => {
    localStorage.removeItem("access");
    setAccessToken(null);
    setProfile(null);

    try {
      await api.post("/auth/logout/");
    } catch (err) {
      // ignore errors
    }

    navigate("/login", { replace: true });
  };

  /* ================= GOOGLE LOGIN ================= */

  const handleGoogleLogin = async () => {
    try {
      const res = await api.get("/auth/google/login/");
      const { auth_url } = res.data;

      const link = document.createElement("a");
      link.href = auth_url;
      link.rel = "noopener noreferrer";
      link.click();
    } catch (err) {
      console.error("Google login failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        profile,
        loadingProfile,
        login,
        logout,
        handleGoogleLogin,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };