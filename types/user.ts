export interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  savedArticles?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface UsersApiResponse {
  page: number;
  perPage: number;
  totalUsers: number;
  totalPages: number;
  users: User[];
}

export interface login {
  email: string,
  password: string,
}