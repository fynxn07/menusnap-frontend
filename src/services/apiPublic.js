import axios from "axios";

const apiPublic = axios.create({
  baseURL: "https://menusnap-backend.onrender.com",
  withCredentials: false,
});

export default apiPublic;

