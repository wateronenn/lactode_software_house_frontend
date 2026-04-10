'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Building2, CalendarDays, LogIn, LogOut, NotebookTabs, User as UserIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navClass = (active: boolean) =>
  `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
    active ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-100'
  }`;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logoutUser } = useApp();

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-950 ">
          <div className="rounded-2xl bg-brand-500 p-2 text-white">
            <Building2 className="h-8 w-8" />
          </div>
          <span>TUM DAI D</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/hotel" className={navClass(pathname.startsWith('/booking'))}>
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Booking</span>
          </Link>

          {user && user.role === 'user' && (
            <Link href="/my-booking" className={navClass(pathname.startsWith('/my-booking') || pathname.startsWith('/edit-booking'))}>
              <NotebookTabs className="h-4 w-4" />
              <span className="hidden sm:inline">My Booking</span>
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link href="/admin/bookings" className={navClass(pathname.startsWith('/admin'))}>
              <NotebookTabs className="h-4 w-4" />
              <span className="hidden sm:inline">Admin Booking</span>
            </Link>
          )}

          <div className="mx-1 hidden h-10 w-px bg-slate-300 sm:block" />

          {user ? (
            <>
              <Link href ="/profile" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-700 sm:inline-flex">
                <UserIcon className="h-4 w-4 text-brand-500" />
                {user.name}
              </Link>
              <button
                onClick={async () => {
                  await logoutUser();
                  router.push('/');
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
