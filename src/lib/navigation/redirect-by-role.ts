import { UserRole } from "@/domain/auth/auth-types";

/**
 * Get redirect path based on user role
 * @param role User role (PERSON/COMPANY) or null
 * @returns Redirect path
 */
export function redirectByRole(role: UserRole | null): string {
  switch (role) {
    case UserRole.Company:
      return "/company";
    case UserRole.Person:
      return "/person";
    default:
      return "/login";
  }
}


