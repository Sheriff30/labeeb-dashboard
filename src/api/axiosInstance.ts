import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://back-end.labeb.sa/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
