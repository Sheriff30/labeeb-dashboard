import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://16.16.195.9/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export const nextApi = axios.create({
  baseURL: "/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";

    if (
      error.response?.status === 401 &&
      !requestUrl.includes("/auth/login") &&
      !requestUrl.includes("/auth/register")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
