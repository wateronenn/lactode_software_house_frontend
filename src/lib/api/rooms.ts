import { Room, RoomInput } from '@/types';
import { request } from './client';

export async function createRoom(input: RoomInput, token: string): Promise<Room> {
  const response = await request<{ success: boolean; data: Room }>(
    `/hotels/${input.hotelId}/rooms`,
    {
      method: 'POST',
      body: JSON.stringify({
        picture: input.picture,
        title: input.roomType,
        roomType: input.roomType,
        price: input.price,
        people: input.people,
        bedType: input.bedType,
        bed: input.bed,
        description: input.description,
        facilities: input.facilities,
        avaliableNumber: input.avaliableNumber,
        availableNumber: input.avaliableNumber,
        status: input.status,
      }),
    },
    token
  );

  return response.data;
}

export async function getRoomById(hotelId: string, roomId: string): Promise<Room> {
  const response = await request<{ success: boolean; data: Room }>(
    `/hotels/${hotelId}/rooms/${roomId}`,
    { method: 'GET' }
  );
  return response.data;
}
