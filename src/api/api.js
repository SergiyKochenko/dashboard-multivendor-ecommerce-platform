import axios from "axios";
const local = "http://localhost:5000";
const production = "https://backend-multivendor-ecommerce-platform.onrender.com";
const useProductionApi =
  process.env.REACT_APP_API_MODE === "pro" ||
  process.env.NODE_ENV === "production";
const api_url =
  process.env.REACT_APP_API_URL ||
  (useProductionApi ? production : local);

const api = axios.create({
  baseURL: `${api_url}/api`,
  withCredentials: true,
});

export default api;
