'use client';

import { useEffect, useState } from 'react';
import { Room } from '@/types';
import AvailabilitySearch, { AvailabilitySearchValues } from '@/src/components/common/AvailabilitySearch';
import Button from '@/src/components/common/Button';
import RoomCardList from '@/src/components/room/RoomCardList';
import { formatApiMessage, getRoomsByHotelId } from '@/src/lib/api';

type HotelAvailabilityRoomsSectionProps = {
  hotelId: string;
  initialRooms: Room[];
  detailBasePath?: string;
  createRoomHref?: string;
  createRoomLabel?: string;
};

type RoomSearchFilters = {
  checkInDate?: string;
  checkOutDate?: string;
  people?: number;
};

export default function HotelAvailabilityRoomsSection({
  hotelId,
  initialRooms,
  detailBasePath = '/hotels',
  createRoomHref,
  createRoomLabel = 'Create Room',
}: HotelAvailabilityRoomsSectionProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [searchFilters, setSearchFilters] = useState<RoomSearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    setRooms(initialRooms);
    setSearchFilters({});
    setIsSearching(false);
    setSearchError(null);
  }, [hotelId, initialRooms]);

  const handleSearch = async (values: AvailabilitySearchValues) => {
    const people = Number.isFinite(values.guests) ? Math.trunc(values.guests) : 0;
    const nextFilters: RoomSearchFilters = {
      checkInDate: values.checkIn || undefined,
      checkOutDate: values.checkOut || undefined,
      people: people > 0 ? people : undefined,
    };

    try {
      setIsSearching(true);
      setSearchError(null);
      setSearchFilters(nextFilters);
      const data = await getRoomsByHotelId(hotelId, nextFilters);
      setRooms(data);
    } catch (error) {
      setSearchError(formatApiMessage(error, 'Could not load room availability.'));
    } finally {
      setIsSearching(false);
    }
  };

  const hasFilters = Boolean(searchFilters.checkInDate || searchFilters.checkOutDate || searchFilters.people);
  const emptyMessage = hasFilters
    ? 'No rooms are available for the selected search criteria.'
    : 'No rooms available for this hotel yet.';

  return (
    <>
      <section className="space-y-3">
        <h2 className="text-subtitle">Availability</h2>
        <AvailabilitySearch onSearch={handleSearch} />
      </section>

      {searchError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {searchError}
        </div>
      ) : null}

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-subtitle">Rooms</h2>
          {createRoomHref ? (
            <Button variant="primary" className="btn-sm" href={createRoomHref}>
              {createRoomLabel}
            </Button>
          ) : null}
        </div>

        {isSearching ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-500">
            Checking available rooms...
          </div>
        ) : null}

        <RoomCardList rooms={rooms} emptyMessage={emptyMessage} detailBasePath={detailBasePath} />
      </section>
    </>
  );
}
