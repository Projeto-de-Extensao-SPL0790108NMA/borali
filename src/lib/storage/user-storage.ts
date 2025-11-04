"use client";

import { logService } from "@/helpers/log-service";

import {
  setLoginData as setLoginDataServer,
  getAccessToken as getAccessTokenServer,
  getRefreshToken as getRefreshTokenServer,
  getUserRole as getUserRoleServer,
  getUserRoles as getUserRolesServer,
  isUserLoggedIn as isUserLoggedInServer,
  clearSecureUserData as clearSecureUserDataServer,
} from "./secure-cookies";
import { LoginDTO } from "@/domain/auth/auth-types";

// Client-side wrapper functions that call server actions
export async function setLoginData({
  loginData,
}: {
  loginData: LoginDTO;
}): Promise<void> {
  logService("API Token:", loginData);
  await setLoginDataServer(loginData);
}

export async function clearUserData(): Promise<void> {
  await clearSecureUserDataServer();
}

export async function isUserLoggedIn(): Promise<boolean> {
  return await isUserLoggedInServer();
}

export async function getAccessToken(): Promise<string | null> {
  return await getAccessTokenServer();
}

export async function getRefreshToken(): Promise<string | null> {
  return await getRefreshTokenServer();
}

export async function getUserRole(): Promise<string | null> {
  return await getUserRoleServer();
}

/**
 * Get array of user roles from the JWT token
 * @returns Array of role strings or empty array if none found
 */
export async function getUserRoles(): Promise<string[]> {
  return await getUserRolesServer();
}
