import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/data",
  headers: {
    "Content-Type": "application/json",
  },
});
