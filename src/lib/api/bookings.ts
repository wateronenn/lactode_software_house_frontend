import { Booking, BookingInput } from '@/types';
import { request } from './client';

export async function getBookings(token: string): Promise<Booking[]> {
  const response = await request<{ success: boolean; data: Booking[] }>('/bookings', { method: 'GET' }, token);
  return response.data;
}

export async function getBookingById(id: string, token: string): Promise<Booking> {
  const response = await request<{ success: boolean; data: Booking }>(`/bookings/${id}`, { method: 'GET' }, token);
  return response.data;
}

export async function createBooking(input: BookingInput, token: string): Promise<Booking> {
  const response = await request<{ success: boolean; data: Booking }>(
    `/hotels/${input.hotelId}/bookings`,
    {
      method: 'POST',
      body: JSON.stringify({
        checkInDate: input.checkInDate,
        checkOutDate: input.checkOutDate,
      }),
    },
    token
  );
  return response.data;
}

export async function updateBooking(id: string, input: BookingInput, token: string): Promise<Booking> {
  const response = await request<{ success: boolean; data: Booking }>(
    `/bookings/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        hotel: input.hotelId,
        checkInDate: input.checkInDate,
        checkOutDate: input.checkOutDate,
      }),
    },
    token
  );
  return response.data;
}

export async function deleteBooking(id: string, token: string): Promise<void> {
  await request<{ success: boolean; data: Record<string, never> }>(`/bookings/${id}`, { method: 'DELETE' }, token);
}
