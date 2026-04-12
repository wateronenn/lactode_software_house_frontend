'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import FacilityList from '@/src/components/common/FacilityList';
import { useApp } from '@/src/context/AppContext';
import { formatApiMessage } from '@/src/lib/api';
import { Hotel } from '@/types';
import { getHotelById } from '@/src/lib/hotels';

// Facility tags — extend when your Hotel type gets a facilities field
const HOTEL_FALLBACK_FACILITIES = [
  'Free Wi-Fi',
  'Air Conditioning',
  'Breakfast',
  'TV',
  'Shower',
];

// ── Icon helpers ──────────────────────────────────────────
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="#2B4EE6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 8 6.5 12.5 14 4" />
    </svg>
  );
}
function IconBed() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="#5A5F6E" strokeWidth="1.7" strokeLinecap="round">
      <rect x="1" y="7.5" width="14" height="7" rx="1.5" />
      <path d="M4 7.5V6a4 4 0 018 0v1.5" />
    </svg>
  );
}
function IconPerson() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="#5A5F6E" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="#5A5F6E" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5v3.5l2 2" />
    </svg>
  );
}
function IconPersonSm() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity={0.65}>
      <circle cx="7" cy="4.5" r="2.5" />
      <path d="M1 12c0-2.5 2.5-4 6-4s6 1.5 6 4" />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────
export default function RoomDetailPage() {
  const router  = useRouter();
  const params  = useParams();
  const hotelId = params?.id as string | undefined;

  const { user, hotels, ready, loading } = useApp();
  const cachedHotel = useMemo(
    () => (hotelId ? hotels.find((item) => item._id === hotelId) ?? null : null),
    [hotelId, hotels]
  );

  const [hotel, setHotel]       = useState<Hotel | null>(cachedHotel);
  const [fetching, setFetching] = useState(false);
  const [error, setError]       = useState<string | null>(null);

  // ── Fetch hotel data ──────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    if (!hotelId) {
      setHotel(null);
      setError('No hotel ID provided.');
      setFetching(false);
      return;
    }

    if (cachedHotel) {
      setHotel(cachedHotel);
      setError(null);
      setFetching(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setFetching(true);
        setError(null);
        const data = await getHotelById(hotelId);
        if (!cancelled) {
          setHotel(data);
        }
      } catch (e) {
        if (!cancelled) {
          setHotel(null);
          setError(formatApiMessage(e, 'Could not load hotel.'));
        }
      } finally {
        if (!cancelled) {
          setFetching(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cachedHotel, hotelId, ready]);

  // ── Loading ───────────────────────────────────────────
  if (!ready || loading || fetching) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-center gap-3 py-20 text-sm text-slate-400">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          Loading room…
        </div>
      </main>
    );
  }

  // ── Error ─────────────────────────────────────────────
  if (error || !hotel) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error ?? 'Hotel not found.'}
        </div>
        <button
          onClick={() => router.push('/hotels')}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
        >
          ← Back to hotels
        </button>
      </main>
    );
  }

  // ── Book button — auth-aware ──────────────────────────
  const handleBook = () => {
    if (user) {
      router.push(`/user/bookings/create?hotelId=${hotel._id}`);
    } else {
      router.push('/signin');
    }
  };

  // ── Render ────────────────────────────────────────────
  return (
    <main className="mx-auto max-w-4xl px-6 py-7 pb-16">

      {/* ← Back */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
      >
        ← Back
      </button>

      {/* Two-column grid */}
      <div className="mt-5 grid grid-cols-1 items-start gap-9 md:grid-cols-[1fr_220px]">

        {/* ── LEFT: image · info · facilities ── */}
        <div>

          {/* Room image */}
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {hotel.image ? (
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-full w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <span className="text-base italic text-slate-400">pic</span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-6 font-serif text-3xl font-normal tracking-tight text-slate-900">
            {hotel.name}
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {hotel.description?.trim() ||
              'A comfortable stay with practical amenities and easy access to nearby attractions.'}
          </p>

          {/* Facilities */}
          <h2 className="mb-4 mt-7 text-lg font-semibold text-slate-900">Facilities</h2>
          <FacilityList facilities={hotel.facilities?.length ? hotel.facilities : HOTEL_FALLBACK_FACILITIES} />

          {/* Book / Sign-in button */}
          <button
            onClick={handleBook}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {user ? 'Book this room' : 'Sign in to Book'}
          </button>

        </div>

        {/* ── RIGHT: stats panel ── */}
        <div className="flex flex-col gap-4 pt-1">

          <div className="flex items-center gap-2.5 text-sm">
            <span className="flex w-[18px] shrink-0 items-center justify-center">
              <IconCheck />
            </span>
            Room Available : 3
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <span className="flex w-[18px] shrink-0 items-center justify-center">
              <IconBed />
            </span>
            Queen Size Bed : 1
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <span className="flex w-[18px] shrink-0 items-center justify-center">
              <IconPerson />
            </span>
            2 people
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <span className="flex w-[18px] shrink-0 items-center justify-center">
              <IconClock />
            </span>
            500 baht/day
          </div>

          {/* Extra hotel info from API */}
          <div className="mt-1 flex flex-col gap-3 border-t border-slate-200 pt-4">
            <div>
              <div className="mb-0.5 text-xs text-slate-400">Province</div>
              <div className="text-sm font-semibold">{hotel.province}</div>
            </div>
            <div>
              <div className="mb-0.5 text-xs text-slate-400">Region</div>
              <div className="text-sm font-semibold">{hotel.region}</div>
            </div>
            <div>
              <div className="mb-0.5 text-xs text-slate-400">Tel</div>
              <div className="text-sm font-semibold">{hotel.tel}</div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}