'use server';

import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'auth-session';
const SESSION_EXPIRY = 15 * 60; // 5 minutes

export interface AuthSessionData {
  username: string;
  password: string;
  timestamp: number;
}

export async function setAuthSession(data: {
  username: string;
  password: string;
}) {
  const cookieStore = await cookies();

  const sessionData: AuthSessionData = {
    username: data.username,
    password: data.password,
    timestamp: Date.now(),
  };

  // Set secure cookie with session data
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_EXPIRY,
    path: '/',
  });
}

export async function getAuthSession(): Promise<AuthSessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  try {
    const sessionData: AuthSessionData = JSON.parse(sessionCookie.value);

    // Check if session is expired
    const isExpired =
      Date.now() - sessionData.timestamp > SESSION_EXPIRY * 1000;
    if (isExpired) {
      await clearAuthSession();
      return null;
    }

    return sessionData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error parsing auth session:', error);
    await clearAuthSession();
    return null;
  }
}

export async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
