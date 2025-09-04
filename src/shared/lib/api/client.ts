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
  // Check if localStorage is available (browser environment)
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor to standardize responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Transform successful responses to ApiResponse format
    const apiResponse: ApiResponse<unknown> = {
      data: response.data,
      success: true,
      status: response.status,
    };

    // Modify the response data but keep the AxiosResponse structure
    response.data = apiResponse;
    return response;
  },
  (error: AxiosError) => {
    // Transform error responses to ApiResponse format
    const errorData = error.response?.data as
      | Record<string, unknown>
      | undefined;
    const apiResponse: ApiResponse<null> = {
      data: null,
      success: false,
      status: error.response?.status || 500,
      error: (errorData?.error as string) || "Ocorreu um erro na requisição",
    };

    // Modify the error response data but keep the AxiosError structure
    if (error.response) {
      error.response.data = apiResponse;
    }

    return Promise.reject(error);
  }
);

// Type-safe request methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    apiClient
      .get<unknown, AxiosResponse<ApiResponse<T>>>(url, config)
      .then((response) => response.data),

  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient
      .post<unknown, AxiosResponse<ApiResponse<T>>>(url, data, config)
      .then((response) => response.data),

  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient
      .put<unknown, AxiosResponse<ApiResponse<T>>>(url, data, config)
      .then((response) => response.data),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient
      .delete<unknown, AxiosResponse<ApiResponse<T>>>(url, config)
      .then((response) => response.data),
};

export default api;
