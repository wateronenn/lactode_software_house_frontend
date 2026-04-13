import { Hotel } from '@/types';
import { request } from './client';

function normalizeHotel(hotel: Hotel): Hotel {
  const source = hotel as unknown as Record<string, unknown>;
  const rawPictures = source.pictures;
  const pictures = Array.isArray(rawPictures)
    ? rawPictures.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
  const location =
    typeof source.location === 'string' && source.location.trim().length > 0
      ? source.location.trim()
      : typeof source.address === 'string' && source.address.trim().length > 0
        ? source.address.trim()
        : '';
  const image =
    typeof source.image === 'string' && source.image.trim().length > 0
      ? source.image.trim()
      : pictures[0] ?? null;

  return {
    ...hotel,
    location,
    address: typeof source.address === 'string' && source.address.trim().length > 0 ? source.address.trim() : location,
    pictures,
    image,
    ownerID: (source.ownerID ?? source.ownerId ?? source.OwnerID) as Hotel['ownerID'],
  };
}

export async function getHotels(): Promise<Hotel[]> {
  const response = await request<{ success: boolean; data: Hotel[] }>('/hotels', { method: 'GET' });
  return response.data.map(normalizeHotel);
}

export async function getHotelsByOwnerId(ownerId: string): Promise<Hotel[]> {
  const response = await request<{ success: boolean; data: Hotel[] }>(
    `/hotels?ownerID=${encodeURIComponent(ownerId)}`,
    { method: 'GET' }
  );
  return response.data.map(normalizeHotel);
}

export async function getHotelById(id: string): Promise<Hotel> {
  const response = await request<{ success: boolean; data: Hotel }>(`/hotels/${id}`, { method: 'GET' });
  return normalizeHotel(response.data);
}

type UpdateHotelInput = Partial<{
  name: string;
  description: string;
  location: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
  tel: string;
  email: string;
  facilities: string[];
  pictures: string[];
  status: string;
}>;

export async function updateHotel(id: string, input: UpdateHotelInput, token: string): Promise<Hotel> {
  const response = await request<{ success: boolean; data: Hotel }>(
    `/hotels/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(input),
    },
    token
  );
  return normalizeHotel(response.data);
}
