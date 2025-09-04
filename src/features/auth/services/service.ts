import { api } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types/api";
import { LoginRequest, LoginResponse, RegisterRequest, User } from "../types";

/**
 * Authentication service
 */
export const authService = {
  /**
   * Login with email and password
   */
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> =>
    api.post<LoginResponse>("/login", data),

  /**
   * Register a new user
   */
  register: (data: RegisterRequest): Promise<ApiResponse<void>> =>
    api.post<void>("/user-create", data),

  /**
   * Get current user profile
   */
  getProfile: (): Promise<ApiResponse<User>> => api.get<User>("/profile"),

  /**
   * Logout (client-side only)
   */
  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};
