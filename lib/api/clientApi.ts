import { api } from './api';
import type { login, User } from "../../types/user";

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