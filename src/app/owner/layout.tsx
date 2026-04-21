import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_ROLE_COOKIE, AUTH_TOKEN_COOKIE } from '@/src/lib/authSession';
import { getRoleLandingPath, normalizeRoleForPath } from '@/src/lib/rolePath';

export default async function OwnerLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.get(AUTH_TOKEN_COOKIE)?.value === '1';
  const role = normalizeRoleForPath(cookieStore.get(AUTH_ROLE_COOKIE)?.value);

  if (!hasSession) {
    redirect('/signin');
  }

  if (role !== 'hotelOwner') {
    redirect(getRoleLandingPath(role));
  }

  return <>{children}</>;
}
