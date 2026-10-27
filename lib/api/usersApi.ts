import axios from 'axios';
import type { UsersApiResponse } from '@/types/user';
import { getErrorMessage } from '@/lib/utils';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://green-tourism-backend.onrender.com/api',
  withCredentials: true,
});

export interface FetchUsersParams {
  page?: number;
  perPage?: number;
}

export async function fetchUsers(
  params: FetchUsersParams
): Promise<UsersApiResponse> {
  try {
    const response = await api.get<UsersApiResponse>('/users', { params });
    return response.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, 'Не вдалося завантажити мандрівників')
    );
  }
}
