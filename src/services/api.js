import axios from "axios";

const api = axios.create({
    baseURL: "https://menusnap-backend.onrender.com",
    withCredentials: true, 
});




api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  
  const isAuthRoute =
    config.url.includes("/auth/login") ||
    config.url.includes("/auth/register") ||
    config.url.includes("/auth/refresh") ||
    config.url.includes("/auth/password_request-otp") ||
    config.url.includes("/auth/password_verify-otp") ||
    config.url.includes("/auth/password_reset");

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



export default api;

