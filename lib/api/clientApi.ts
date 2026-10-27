import { api } from './api';
import type { login, User } from '../../types/user';
import { Story } from '@/types/story';

export const loginUser = async (user: login) => {
  const response = await api.post<User>('auth/login', user); // it was 'users/login'
  return response.data;
};
//============================================
export interface FetchStoriesParams {
  page?: number;
  perPage?: number;
  category?: string;
  type?: string;
}

export interface FetchStoriesResponse {
  page: number;
  perPage: number;
  totalStories: number;
  totalPages: number;
  stories: Story[];
}
export const fetchStories = async (
  params: FetchStoriesParams
): Promise<FetchStoriesResponse> => {
  const response = await api.get<FetchStoriesResponse>('/stories', { params });
  return response.data;
};

//============================================
export const fetchCurrentUser = async (): Promise<User> => {
  const response = await api.get<{ user: User }>('/users/me');
  return response.data.user;
};

export const fetchSavedStories = async (
  params: FetchStoriesParams
): Promise<FetchStoriesResponse> => {
  const response = await api.get<FetchStoriesResponse>(
    '/users/me/saved-stories',
    { params }
  );
  return response.data;
};

export const fetchMyStories = async (
  params: FetchStoriesParams
): Promise<FetchStoriesResponse> => {
  const response = await api.get<FetchStoriesResponse>('/users/me/stories', {
    params,
  });
  return response.data;
};

export { fetchUsers } from './usersApi';
export type { FetchUsersParams } from './usersApi';
