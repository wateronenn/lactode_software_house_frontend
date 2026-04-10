'use client';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import BookingForm from '@/components/BookingForm';

export default function BookingPageClient() {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotelId');
  const { user, ready } = useApp();

  if (!ready) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">Please login before booking</div>;
  }

  return <BookingForm defaultHotelId={hotelId || undefined}  />;
}