import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/auth/",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const getProfile = () => API.get("/profile/");


export const updateProfile = (formData) =>
  API.patch("/profile/", formData);



export const changePassword = (data) =>
  API.post("/change_password/", data);
