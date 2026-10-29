import type { User } from '@/types/user';

import { api } from './api';

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUserData): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);

  return response.data;
};