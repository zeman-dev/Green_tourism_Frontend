import { api } from './api';
import type { Story } from '@/types/story';
import type { User } from '@/types/user';
import type { ProfileTab } from '@/lib/constants/profileTabs';

export type ProfileStory = Omit<Story, 'ownerId'> & {
  ownerId: { _id: string; name: string; avatarUrl: string };
};

export type ProfileStoriesResponse = {
  page: number | string;
  perPage: number | string;
  totalStories: number;
  totalPages: number | string;
  stories: ProfileStory[];
};

export type ProfileStoriesParams = {
  page: number;
  perPage: number;
};

type ProfileStoriesFetcher = (
  params: ProfileStoriesParams
) => Promise<ProfileStoriesResponse>;

export const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await api.get<{ user: User }>('/users/me');
  return data.user;
};

export const fetchSavedStories: ProfileStoriesFetcher = async params => {
  const { data } = await api.get<ProfileStoriesResponse>(
    '/users/me/saved-stories',
    { params }
  );
  return data;
};

export const fetchMyStories: ProfileStoriesFetcher = async params => {
  const { data } = await api.get<ProfileStoriesResponse>('/users/me/stories', {
    params,
  });
  return data;
};

const fetchersByTab: Record<ProfileTab, ProfileStoriesFetcher> = {
  saved: fetchSavedStories,
  own: fetchMyStories,
};

export const fetchProfileStories = (
  tab: ProfileTab,
  params: ProfileStoriesParams
): Promise<ProfileStoriesResponse> => fetchersByTab[tab](params);
