"use server";

import { LoginDTO, UserRole, JwtTokenPayload } from "@/domain/auth/auth-types";
import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "access-token";
const REFRESH_TOKEN_COOKIE = "refresh-token";
const USER_DATA_COOKIE = "user-data";
const ROLE_COOKIE = "role";
const USER_ROLE_COOKIE = "user-role"; // Role principal (PERSON/COMPANY)
const USER_ROLES_COOKIE = "user-roles";
const TENANT_ID_COOKIE = "tenant-id";

// Cookie expiry defaults (fallback se expires_in não vier da API)
const DEFAULT_ACCESS_TOKEN_EXPIRY = 1800; // 30 minutes
const DEFAULT_REFRESH_TOKEN_EXPIRY = 1800; // 30 minutes
const DEFAULT_ROLE_EXPIRY = 1800; // 30 minutes
const DEFAULT_TENANT_ID_EXPIRY = 1800; // 30 minutes

/**
 * Interface for JWT token payload with roles
 */
interface JwtPayload extends JwtTokenPayload {
  roles?: string[];
  role?: UserRole;
  sub?: string;
  [key: string]: unknown;
}

/**
 * Decodes a JWT token without using external libraries
 * @param token JWT token to decode
 * @returns Decoded token payload or null if invalid
 */
function decodeJwt(token: string): JwtPayload | null {
  try {
    // JWT structure: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Base64Url decode the payload (second part)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    // Silently handle error and return null
    return null;
  }
}

/**
 * Extracts roles from a JWT token
 * @param token JWT token
 * @returns Array of roles or empty array if none found
 */
function extractRolesFromToken(token: string): string[] {
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.roles) return [];
  return decoded.roles;
}

/**
 * Extracts main role (PERSON/COMPANY) from JWT token
 * @param token JWT token
 * @returns UserRole or null if not found
 */
function extractUserRoleFromToken(token: string): UserRole | null {
  const decoded = decodeJwt(token);
  if (!decoded) return null;

  // Prioridade: role direto > roles array > null
  if (
    decoded.role &&
    (decoded.role === UserRole.Person || decoded.role === UserRole.Company)
  ) {
    return decoded.role;
  }

  // Fallback: verifica roles array
  if (decoded.roles && Array.isArray(decoded.roles)) {
    const role = decoded.roles.find(
      (r) => r === UserRole.Person || r === UserRole.Company
    );
    if (role) return role as UserRole;
  }

  return null;
}

// Save login-related cookies (tokens) and role data
export async function setLoginData(
  loginData: LoginDTO & {
    user_permission?: string;
    tenant_id?: string;
  }
): Promise<{ userRole: UserRole | null }> {
  const cookieStore = await cookies();
  const accessToken = loginData.data.access_token;

  // Usa expires_in da API, com fallback para default
  const accessTokenExpiry =
    loginData.data.expires_in || DEFAULT_ACCESS_TOKEN_EXPIRY;
  const refreshTokenExpiry =
    loginData.data.refresh_expires_in || DEFAULT_REFRESH_TOKEN_EXPIRY;

  // Set secure cookies with HttpOnly flag
  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessTokenExpiry,
    path: "/",
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE, loginData.data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: refreshTokenExpiry,
    path: "/",
  });

  // Extract and save main user role (PERSON/COMPANY) from JWT
  // Note: This cookie is for UI rendering only - always validate against token in security-critical operations
  const userRole = extractUserRoleFromToken(accessToken);
  if (userRole) {
    cookieStore.set(USER_ROLE_COOKIE, userRole, {
      httpOnly: false, // Not httpOnly so it can be accessed by client-side code for UI rendering
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: accessTokenExpiry, // Usa mesmo expiry do access token
      path: "/",
    });
  }

  // Also persist role/permission from loginData if available (legacy support)
  if (loginData.user_permission) {
    cookieStore.set(ROLE_COOKIE, loginData.user_permission, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: DEFAULT_ROLE_EXPIRY,
      path: "/",
    });
  }

  // Extract and save roles array from the JWT token
  const roles = extractRolesFromToken(accessToken);
  cookieStore.set(USER_ROLES_COOKIE, JSON.stringify(roles), {
    httpOnly: false, // Not httpOnly so it can be accessed by client-side code
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessTokenExpiry, // Usa mesmo expiry do access token
    path: "/",
  });

  // Save tenant_id from loginData if available
  if (loginData.tenant_id) {
    cookieStore.set(TENANT_ID_COOKIE, loginData.tenant_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: DEFAULT_TENANT_ID_EXPIRY,
      path: "/",
    });
  }

  return { userRole };
}

export async function getAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(ACCESS_TOKEN_COOKIE);
    return tokenCookie?.value || null;
  } catch {
    return null;
  }
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(REFRESH_TOKEN_COOKIE);
    return tokenCookie?.value || null;
  } catch {
    return null;
  }
}

/**
 * Get main user role (PERSON/COMPANY) from JWT token (source of truth)
 * Always validates against the httpOnly token to prevent tampering
 * @returns UserRole or null if not found
 */
export async function getUserRoleType(): Promise<UserRole | null> {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    // Always extract from token (source of truth)
    return extractUserRoleFromToken(token);
  } catch {
    return null;
  }
}

/**
 * Get main user role from cookie (cache only - not secure)
 * Use getUserRoleType() for security-critical operations
 * @returns UserRole or null if not found
 * @deprecated Use getUserRoleType() instead - this is only for client-side UI rendering
 */
export async function getUserRoleTypeFromCookie(): Promise<UserRole | null> {
  try {
    const cookieStore = await cookies();
    const roleCookie = cookieStore.get(USER_ROLE_COOKIE);
    if (!roleCookie?.value) return null;

    const role = roleCookie.value as UserRole;
    if (role === UserRole.Person || role === UserRole.Company) {
      // Validate against token to prevent tampering
      const token = await getAccessToken();
      if (token) {
        const tokenRole = extractUserRoleFromToken(token);
        if (tokenRole !== role) {
          // Cookie was tampered with - return token role instead
          return tokenRole;
        }
      }
      return role;
    }

    return null;
  } catch {
    return null;
  }
}

export async function getUserRole(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const roleCookie = cookieStore.get(ROLE_COOKIE);
    return roleCookie?.value || null;
  } catch {
    return null;
  }
}

export async function isUserLoggedIn(): Promise<boolean> {
  const token = await getAccessToken();
  return token !== null;
}

export async function getTenantId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const tenantIdCookie = cookieStore.get(TENANT_ID_COOKIE);
    return tenantIdCookie?.value || null;
  } catch {
    return null;
  }
}

export async function getUserRoles(): Promise<string[]> {
  try {
    const cookieStore = await cookies();
    const rolesCookie = cookieStore.get(USER_ROLES_COOKIE);
    if (!rolesCookie?.value) return [];
    return JSON.parse(rolesCookie.value);
  } catch {
    return [];
  }
}

export async function clearSecureUserData(): Promise<void> {
  const cookieStore = await cookies();

  // Clear all secure cookies
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  cookieStore.delete(USER_DATA_COOKIE);
  cookieStore.delete(ROLE_COOKIE);
  cookieStore.delete(USER_ROLE_COOKIE);
  cookieStore.delete(USER_ROLES_COOKIE);
  cookieStore.delete(TENANT_ID_COOKIE);
}
