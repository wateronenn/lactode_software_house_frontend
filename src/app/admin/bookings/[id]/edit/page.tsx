'use client';

import { useParams } from 'next/navigation';
import BookingForm from '@/src/components/booking/BookingForm';
import { useApp } from '@/src/context/AppContext';

export default function AdminEditBookingPage() {
  const params = useParams<{ id: string }>();
  const { user } = useApp();

  if (user?.role !== 'admin') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-10 text-amber-700 shadow-soft">
          Admin access only. Sign in with an admin account to edit bookings.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <BookingForm bookingId={params.id} />
    </main>
  );
}
