import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://16.16.195.9/api",
  headers: { "Content-Type": "application/json" },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ----------------------
// Queue & Refresh Logic
// ----------------------
type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: AxiosError) => void;
};

type RefreshTokenResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    token_type: string;
    expires_in: number;
  };
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const requestUrl = originalRequest?.url || "";

    if (
      error.response?.status === 401 &&
      !requestUrl.includes("/auth/login") &&
      !requestUrl.includes("/auth/register") &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers && typeof token === "string") {
            originalRequest.headers["Authorization"] = "Bearer " + token;
          }
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axiosInstance.post<RefreshTokenResponse>(
          "/auth/refresh"
        );
        const newToken = refreshResponse.data.data.token;

        Cookies.set("token", newToken);
        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = "Bearer " + newToken;
        }

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        Cookies.remove("token");
        Cookies.remove("role");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
