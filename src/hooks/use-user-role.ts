"use client";

import { useEffect, useState } from "react";

import { logService } from "@/helpers/log-service";

// Helper function to get role from cookie
const getRoleFromCookie = () => {
  if (typeof document === "undefined") return null;
  // Try user-role first (current cookie name), then role (legacy)
  const match =
    document.cookie.match(/(?:^|; )user-role=([^;]+)/) ||
    document.cookie.match(/(?:^|; )role=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

// Helper function to get roles array from cookie
const getRolesFromCookie = (): string[] => {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(/(?:^|; )user-roles=([^;]+)/);
  if (!match) return [];
  try {
    const rolesJson = decodeURIComponent(match[1]);
    return JSON.parse(rolesJson);
  } catch (error) {
    logService("Error parsing user roles from cookie:", error);
    return [];
  }
};

export function useUserRole() {
  // Start with empty array to avoid hydration mismatch
  const [roles, setRoles] = useState<string[]>([]);
  // Keep single role for backward compatibility
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get roles from cookie immediately
    const currentRoles = getRolesFromCookie();
    const currentRole = getRoleFromCookie();

    logService("use-user-role.ts | roles:", currentRoles);
    logService("use-user-role.ts | role:", currentRole);

    if (currentRoles.length > 0) {
      setRoles(currentRoles);
      // Set the first role as the primary role for backward compatibility
      setRole(currentRoles[0]);
      setIsLoading(false);
    } else if (currentRole) {
      // Fallback to single role if available
      setRole(currentRole);
      setRoles(currentRole ? [currentRole] : []);
      setIsLoading(false);
    } else {
      // If no roles found, try a few more times with shorter delays
      let attempts = 0;
      const maxAttempts = 2;
      const delays = [25, 100];

      const tryGetRoles = () => {
        const retryRoles = getRolesFromCookie();
        const retryRole = getRoleFromCookie();

        if (retryRoles.length > 0) {
          setRoles(retryRoles);
          setRole(retryRoles[0]);
          setIsLoading(false);
        } else if (retryRole) {
          setRole(retryRole);
          setRoles([retryRole]);
          setIsLoading(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryGetRoles, delays[attempts - 1] || 100);
        } else {
          // Give up after max attempts
          setIsLoading(false);
        }
      };

      // Start trying to get the roles
      tryGetRoles();
    }

    // Listen for cookie changes (when user logs in/out)
    const handleStorageChange = () => {
      const updatedRoles = getRolesFromCookie();
      const updatedRole = getRoleFromCookie();

      if (updatedRoles.length > 0) {
        setRoles(updatedRoles);
        setRole(updatedRoles[0]);
      } else if (updatedRole) {
        setRole(updatedRole);
        setRoles([updatedRole]);
      } else {
        setRole(null);
        setRoles([]);
      }
    };

    // Listen for storage events (cross-tab synchronization)
    window.addEventListener("storage", handleStorageChange);

    // Listen for custom role change events
    window.addEventListener("roleChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("roleChanged", handleStorageChange);
    };
  }, []);

  return {
    role, // Keep for backward compatibility
    roles, // New array of roles
    hasRole: (roleToCheck: string) => roles.includes(roleToCheck),
    isLoading,
  };
}
