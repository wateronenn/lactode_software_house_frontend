import { Room, RoomInput } from '@/types';
import { request } from './client';

function normalizeRoom(room: Room): Room {
  const source = room as unknown as Record<string, unknown>;
  const rawPicture = source.picture;
  const picture = Array.isArray(rawPicture)
    ? rawPicture.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
  const availableNumber =
    typeof source.availableNumber === 'number'
      ? source.availableNumber
      : typeof source.avaliableNumber === 'number'
        ? source.avaliableNumber
        : 0;
  const image =
    typeof source.image === 'string' && source.image.trim().length > 0
      ? source.image.trim()
      : picture[0] ?? null;
  const hotelID = (source.hotelID ?? source.hotel) as Room['hotelID'];

  return {
    ...room,
    hotelID,
    hotel: hotelID,
    picture,
    image,
    availableNumber,
    avaliableNumber: availableNumber,
  };
}

export async function createRoom(input: RoomInput, token: string): Promise<Room> {
  const availableNumber =
    typeof input.availableNumber === 'number'
      ? input.availableNumber
      : (input.avaliableNumber ?? 0);

  const response = await request<{ success: boolean; data: Room }>(
    `/hotels/${input.hotelId}/rooms`,
    {
      method: 'POST',
      body: JSON.stringify({
        hotelID: input.hotelId,
        picture: input.picture,
        roomType: input.roomType,
        price: input.price,
        people: input.people,
        bedType: input.bedType,
        bed: input.bed,
        description: input.description,
        facilities: input.facilities,
        availableNumber,
        status: input.status,
      }),
    },
    token
  );

  return normalizeRoom(response.data);
}

export async function getRoomById(hotelId: string, roomId: string): Promise<Room> {
  const response = await request<{ success: boolean; data: Room }>(
    `/hotels/${hotelId}/rooms/${roomId}`,
    { method: 'GET' }
  );
  return normalizeRoom(response.data);
}
