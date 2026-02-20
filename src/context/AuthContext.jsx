import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access")
    );

    const login = async (email, password) => {
    try{
        const res = await api.post("/auth/login/", {
            email,
            password,
        });

        const access = res.data.access;

        localStorage.setItem("access", access);
        setAccessToken(access);

        const decoded = jwtDecode(access);

        return decoded;
    }   catch (err) {
        const message =
            err.response?.data?.detail ||
            "Login failed. Please try again.";

        throw new Error(message);
    }
};

    const fetchProfile = async () => {
        const res = await api.get("/auth/profile/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        });
        return res.data;
    };

    /* 🚪 LOGOUT */
    const logout = async () => {
        localStorage.removeItem("access");
        setAccessToken(null);

        await api.post("/auth/logout/");
        navigate("/login", { replace: true }); 
    };

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
                login,
                fetchProfile,
                logout,
                handleGoogleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
