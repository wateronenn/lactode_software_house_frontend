import { Booking, BookingInput } from '@/types';
import { request } from './client';

function normalizeBooking(booking: Booking): Booking {
  const source = booking as unknown as Record<string, unknown>;
  const hotelSource = (source.hotelID ?? source.hotel) as Booking['hotelID'];
  const roomSource = (source.roomID ?? source.room) as Booking['roomID'];

  return {
    ...booking,
    hotelID: hotelSource,
    hotel: hotelSource,
    roomID: roomSource,
    room: roomSource,
  };
}

export async function getBookings(token: string): Promise<Booking[]> {
  const response = await request<{ success: boolean; data: Booking[] }>('/bookings', { method: 'GET' }, token);
  return response.data.map(normalizeBooking);
}

export async function getBookingById(id: string, token: string): Promise<Booking> {
  const response = await request<{ success: boolean; data: Booking }>(`/bookings/${id}`, { method: 'GET' }, token);
  return normalizeBooking(response.data);
}

export async function createBooking(input: BookingInput, token: string): Promise<Booking> {
  const payload = {
    checkInDate: input.checkInDate,
    checkOutDate: input.checkOutDate,
    ...(input.roomId ? { roomID: input.roomId } : {}),
  };

  const response = await request<{ success: boolean; data: Booking }>(
    `/hotels/${input.hotelId}/bookings`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    token
  );
  return normalizeBooking(response.data);
}

export async function updateBooking(id: string, input: BookingInput, token: string): Promise<Booking> {
  const payload = {
    hotelID: input.hotelId,
    checkInDate: input.checkInDate,
    checkOutDate: input.checkOutDate,
    ...(input.roomId ? { roomID: input.roomId } : {}),
  };

  const response = await request<{ success: boolean; data: Booking }>(
    `/bookings/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
    token
  );
  return normalizeBooking(response.data);
}

export async function deleteBooking(id: string, token: string): Promise<void> {
  await request<{ success: boolean; data: Record<string, never> }>(`/bookings/${id}`, { method: 'DELETE' }, token);
}
