import axios from "axios";

const apiPublic = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

export default apiPublic;
