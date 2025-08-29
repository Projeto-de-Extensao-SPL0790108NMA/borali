import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../services/service";
import { useAuthStore } from "../store";
import { LoginRequest, RegisterRequest } from "../types";
import { useRouter } from "next/navigation";

/**
 * Hook for authentication operations
 */
export function useAuth() {
  const { token, user, isAuthenticated, setAuth, logout } = useAuthStore();
  const router = useRouter();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const { token, user } = response.data;
        setAuth(token, user);
        router.push("/home");
      }
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      router.push("/login");
    },
  });

  // Get user profile query
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.getProfile(),
    enabled: !!token, // Only run if token exists
  });

  // Logout function
  const handleLogout = () => {
    authService.logout();
    logout();
    router.push("/login");
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading: loginMutation.isPending || registerMutation.isPending,

    // Login
    login: loginMutation.mutate,
    loginError: loginMutation.error,

    // Register
    register: registerMutation.mutate,
    registerError: registerMutation.error,

    // Profile
    profile: profileQuery.data?.data,
    profileLoading: profileQuery.isLoading,
    profileError: profileQuery.error,

    // Logout
    logout: handleLogout,
  };
}
