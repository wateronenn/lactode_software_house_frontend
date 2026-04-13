import { LoginInput, RegisterInput, User } from '@/types';
import { request } from './client';

export async function registerUser(input: RegisterInput): Promise<{ token: string }> {
  return request<{ success: boolean; token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function loginUser(input: LoginInput): Promise<{ token: string }> {
  return request<{ success: boolean; token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function getMe(token: string): Promise<User> {
  const response = await request<{ success: boolean; data: User }>('/auth/me', { method: 'GET' }, token);
  return response.data;
}

export async function logoutUser(token: string): Promise<void> {
  await request<{ success: boolean; data: Record<string, never> }>('/auth/logout', { method: 'GET' }, token);
}

export async function updateUser(
  id: string,
  data: Partial<{ name: string; email: string; tel: string }>,
  token: string
): Promise<User> {
  const response = await request<{ success: boolean; data: User }>(
    `/auth/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    token
  );

  return response.data;
}

export async function updatePassword(
  userId: string,
  payload: { currentPassword?: string; newPassword: string },
  token: string
): Promise<{ success: boolean; msg: string }> {
  return request(`/auth/${userId}/password`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }, token);
}
