import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true
});

// optional: interceptor
// api.interceptors.response.use(
//   res => res,
//   err => Promise.reject(err.response?.data || err)
// );

export default api;