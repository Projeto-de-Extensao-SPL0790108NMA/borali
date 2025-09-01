import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "./types";

/**
 * Auth store using Zustand with persistence
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token: string, user: User) =>
        set({ token, user, isAuthenticated: true }),

      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
