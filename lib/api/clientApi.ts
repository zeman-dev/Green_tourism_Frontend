import { api } from './api';
import type { login, User } from '../../types/user';
import { Story } from '@/types/story';
import type { Category } from '@/types/category';

export interface FetchUsersParams {
  page?: number;
  perPage?: number;
}

export interface FetchUsersResponse {
  page: number;
  perPage: number;
  totalUsers: number;
  totalPages: number;
  users: User[];
}

export const fetchUsers = async (
  params: FetchUsersParams
): Promise<FetchUsersResponse> => {
  const response = await api.get<FetchUsersResponse>('/users', { params });
  return response.data;
};

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

export interface FetchTravellerStoriesParams extends FetchStoriesParams {
  travellerId: string;
}
export const fetchTravellerStories = async ({
  travellerId,
  ...params
}: FetchTravellerStoriesParams): Promise<FetchStoriesResponse> => {
  const response = await api.get<FetchStoriesResponse>(
    `/users/${encodeURIComponent(travellerId)}`,
    { params },
  );
  return response.data;
};

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

//===========================================

export type StoryCreateResponse = {
  _id?: string;
  story?: {
    _id?: string;
  };
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories');
  return response.data;
};

export const createStory = async (
  formData: FormData,
): Promise<StoryCreateResponse> => {
  const response = await api.post<StoryCreateResponse>('/stories', formData);
  return response.data;
};
