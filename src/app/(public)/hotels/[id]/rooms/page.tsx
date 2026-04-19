'use client';

import { useParams, useRouter } from 'next/navigation';

export default function PublicHotelRoomsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-slate-900">Rooms</h1>
        <p className="mt-3 text-slate-500">
          Detailed room listing for hotel {params.id} is not wired yet. Use the hotel detail page for the current booking flow.
        </p>
        <button
          type="button"
          onClick={() => router.push(`/hotels/${params.id}`)}
          className="mt-6 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Back to hotel
        </button>
      </div>
    </main>
  );
}
