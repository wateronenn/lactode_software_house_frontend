import { Hotel } from '@/types';
import { request } from './client';

export async function getHotels(): Promise<Hotel[]> {
  const response = await request<{ success: boolean; data: Hotel[] }>('/hotels', { method: 'GET' });
  return response.data;
}

export async function getHotelById(id: string): Promise<Hotel> {
  const response = await request<{ success: boolean; data: Hotel }>(`/hotels/${id}`, { method: 'GET' });
  return response.data;
}
