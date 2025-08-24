import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Internal API base URL
});

export default axiosInstance;
