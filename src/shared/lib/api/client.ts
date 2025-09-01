import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/types/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor to standardize responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Transform successful responses to ApiResponse format
    return {
      data: response.data,
      success: true,
      status: response.status,
    } as ApiResponse<unknown>;
  },
  (error: AxiosError) => {
    // Transform error responses to ApiResponse format
    const errorData = error.response?.data as
      | Record<string, unknown>
      | undefined;
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      status: error.response?.status || 500,
      error: (errorData?.error as string) || "Ocorreu um erro na requisição",
    };

    return Promise.reject(response);
  }
);

// Type-safe request methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T, ApiResponse<T>>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T, ApiResponse<T>>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T, ApiResponse<T>>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T, ApiResponse<T>>(url, config),
};

export default api;
