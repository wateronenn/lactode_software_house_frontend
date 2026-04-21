import { normalizeRoleForPath } from '@/src/lib/rolePath';
import { AUTH_ROLE_COOKIE, AUTH_TOKEN_COOKIE } from '@/src/lib/authSession';

function buildCookie(name: string, value: string, maxAge: number) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function setAuthCookies(role: unknown, hasSession = true) {
  if (typeof document === 'undefined') return;

  const normalizedRole = normalizeRoleForPath(role);
  document.cookie = buildCookie(AUTH_ROLE_COOKIE, normalizedRole, hasSession ? 60 * 60 * 24 * 7 : 0);
  document.cookie = buildCookie(AUTH_TOKEN_COOKIE, hasSession ? '1' : '', hasSession ? 60 * 60 * 24 * 7 : 0);
}

export function clearAuthCookies() {
  if (typeof document === 'undefined') return;

  document.cookie = `${AUTH_ROLE_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  document.cookie = `${AUTH_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
