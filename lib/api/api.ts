import clientApi from './clientApi';
import type { RegisterUserData, User } from '../../types/user';

export const registerUser = async (
  data: RegisterUserData,
): Promise<User> => {
  const response = await clientApi.post<User>('/api/auth/register', data);

  return response.data;
};