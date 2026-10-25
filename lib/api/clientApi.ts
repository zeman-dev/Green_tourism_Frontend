import { api } from './api';
import type { login, User } from "../../types/user";
import { Story } from '@/types/story';

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

export const fetchUsers = async (params: FetchUsersParams): Promise<FetchUsersResponse> => {
  

  const response = await api.get<FetchUsersResponse>('/users', { params });
  return response.data;
};

export const loginUser = async (user : login) => {
 const response = await api.post<User>('users/login', user);
 return response.data;
}
//============================================
export interface FetchStoriesParams {
  page?: number;
  perPage?: number;
  category?: string;
  type?:string;
}


export interface FetchStoriesResponse {
  page: number;
  perPage: number;
  totalStories: number;
  totalPages: number;
  stories: Story[];
}
export const fetchStories = async (params: FetchStoriesParams): Promise<FetchStoriesResponse> => {
  

  const response = await api.get<FetchStoriesResponse>('/stories', { params });
  return response.data;
};

//============================================