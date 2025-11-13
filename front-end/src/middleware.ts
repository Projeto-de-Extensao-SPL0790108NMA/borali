import { NextResponse, type NextRequest } from "next/server";

import { logService } from "@/helpers/log-service";
import { UserRole } from "./domain/auth/auth-types";
import { PermissionType } from "./domain/auth/auth-types";

// Public routes that don't require auth
const PUBLIC_PATHS = [
  "/home",
  "/map",
  "/login",
  "/register",
  "/verification",
  "/forgot-password",
  "/create-password",
  "/change-password",
];

// Role-specific allowed paths
const ROLE_PATHS: Record<UserRole, string[]> = {
  [UserRole.Person]: ["/person"],
  [UserRole.Company]: ["/company"],
};

// Permission-specific allowed prefixes (legacy support)
const COMMON_ALLOWED = ["/dashboard", "/customers", "/account", "/logout"];

const ALLOWED_BY_PERMISSION: Record<string, string[]> = {
  [PermissionType.Company]: ["/company", "/logout"],
  [PermissionType.User]: COMMON_ALLOWED,
};

/**
 * Decodes a JWT token without using external libraries (Edge runtime compatible)
 * @param token JWT token to decode
 * @returns Decoded token payload or null if invalid
 */
function decodeJwt(
  token: string
): { role?: UserRole; roles?: string[]; [key: string]: unknown } | null {
  try {
    // JWT structure: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Base64Url decode the payload (second part)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64 using atob (available in Edge runtime)
    const binaryString = atob(base64);

    // Decode URI component
    const jsonPayload = decodeURIComponent(
      binaryString
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as {
      role?: UserRole;
      roles?: string[];
      [key: string]: unknown;
    };
  } catch {
    return null;
  }
}

/**
 * Extracts main role (PERSON/COMPANY) from JWT token (Edge runtime compatible)
 * This is the source of truth - always extracts from the httpOnly token
 * @param token JWT access token
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

/**
 * Extract user roles from cookies (Edge runtime compatible) - Legacy support only
 */
function getUserRolesFromCookies(request: NextRequest): string[] {
  const rolesCookie = request.cookies.get("user-roles");
  if (!rolesCookie?.value) return [];

  try {
    return JSON.parse(rolesCookie.value);
  } catch {
    return [];
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    logService("Public route accessed", { path: pathname });
    return NextResponse.next();
  }

  // Require access token for any non-public route
  const tokenCookie = request.cookies.get("access-token");
  const token = tokenCookie?.value ?? "";

  if (!token) {
    logService("No access token found", {
      path: pathname,
      availableCookies: request.cookies.getAll().map((c) => c.name),
    });

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // ALWAYS extract role from JWT token (source of truth) - not from cookie
  // This prevents cookie tampering attacks
  const userRole = extractUserRoleFromToken(token);

  // If role mismatch detected, log security warning
  const cookieRole = request.cookies.get("user-role")?.value;
  if (cookieRole && cookieRole !== userRole) {
    logService("SECURITY WARNING: Role cookie mismatch with token", {
      path: pathname,
      cookieRole,
      tokenRole: userRole,
    });
  }

  // If user role is available, enforce role-based access
  if (userRole) {
    const allowedPaths = ROLE_PATHS[userRole] || [];
    const isAllowed = allowedPaths.some((base) => pathname.startsWith(base));

    if (!isAllowed) {
      logService("Access denied for role", {
        role: userRole,
        path: pathname,
        allowedPaths,
      });

      // Redirect to appropriate dashboard based on role
      const url = request.nextUrl.clone();
      url.pathname = userRole === UserRole.Company ? "/company" : "/person";

      return NextResponse.redirect(url);
    }

    logService("Access granted", {
      role: userRole,
      path: pathname,
    });

    return NextResponse.next();
  }

  // Fallback: Permission-based allow list (legacy support)
  const roles = getUserRolesFromCookies(request);
  const permissions = roles.map((role) => {
    if (role === "super-admin") return PermissionType.Company;
    if (role === "admin") return PermissionType.User;
    return role as PermissionType;
  });

  const allowed = permissions.reduce<string[]>((acc, role) => {
    const paths = ALLOWED_BY_PERMISSION[role] ?? [];
    return [...acc, ...paths];
  }, []);

  const effectiveAllowed = allowed.length > 0 ? allowed : COMMON_ALLOWED;
  const isAllowed = effectiveAllowed.some((p) => pathname.startsWith(p));

  if (!isAllowed) {
    logService("Access denied for permissions", {
      path: pathname,
      permissions: permissions.length ? permissions : "none",
      allowedPaths: effectiveAllowed,
    });

    const url = request.nextUrl.clone();
    url.pathname = permissions.includes(PermissionType.Company)
      ? "/companies"
      : "/dashboard";

    return NextResponse.redirect(url);
  }

  logService("Access granted", {
    path: pathname,
    permissions: permissions.length ? permissions : "none",
  });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.[^/]+$).*)"],
};
