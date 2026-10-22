import { api } from './api';

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUserData) => {
  const response = await api.post('/auth/register', data);

  return response.data;
};