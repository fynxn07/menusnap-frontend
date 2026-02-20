import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        const access = params.get("access");

        if (!access) {
            navigate("/login", { replace: true });
            return;
        }

        localStorage.setItem("access", access);
        setAccessToken(access);

        const decoded = jwtDecode(access);

        if (decoded.is_onboarding_completed) {
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/onboarding/details", { replace: true });
        }
    }, [navigate, params, setAccessToken]);

    return <p>Signing you in...</p>;
};

export default GoogleCallback;
