'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchCurrentUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore(state => state.setUser);
  const clear = useAuthStore(state => state.clearIsAuthenticated);
  const { data, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);
  useEffect(() => {
    if (isAxiosError(error) && error.response?.status === 401) clear();
  }, [error, clear]);
  return children;
}
