import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/lib/store/authStore';

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const authEndpoints = [
  'auth/login',
  'auth/register',
  'auth/refresh',
  'auth/logout',
];

let refreshPromise: Promise<void> | null = null;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true,
});

function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post('/api/auth/refresh', null, { withCredentials: true })
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function handleRefreshFailure(
  error: unknown,
  wasAuthenticated: boolean
): Promise<never> {
  useAuthStore.getState().clearIsAuthenticated();

  if (
    wasAuthenticated &&
    typeof window !== 'undefined' &&
    window.location.pathname !== '/login'
  ) {
    window.location.replace('/login');
  }

  return Promise.reject(error);
}

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;

    if (
      !original ||
      error.response?.status !== 401 ||
      original._retry
    ) {
      return Promise.reject(error);
    }

    if (
      authEndpoints.some(endpoint => original.url?.includes(endpoint))
    ) {
      return Promise.reject(error);
    }

    const wasAuthenticated = useAuthStore.getState().isAuthenticated;
    const isCurrentUserRequest =
      original.url?.includes('/users/me') ?? false;

    if (!wasAuthenticated && !isCurrentUserRequest) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      await refreshSession();

      return api(original);
    } catch (refreshError) {
      try {
        return await api(original);
      } catch {
        return handleRefreshFailure(refreshError, wasAuthenticated);
      }
    }
  }
);
