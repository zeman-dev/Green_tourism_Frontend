import axios from 'axios';

import type { StoriesResponse } from '@/types/story';
import type { User } from '@/types/user';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';

const serverApi = axios.create({
  baseURL: process.env.API_URL,
});

export type TravellerProfile = StoriesResponse & {
  user: User;
};

type TravellerResponse = StoriesResponse & {
  user: {
    _id: string;
    username?: string;
    name?: string;
    avatarUrl?: string;
    articlesAmount: number;
  };
};

export async function fetchTravellerProfileServer(
  travellerId: string,
  perPage: number,
): Promise<TravellerProfile> {
  const profileResponse = await serverApi.get<TravellerResponse>(
  `/users/${encodeURIComponent(travellerId)}`,
  {
    params: {
      page: 1,
      perPage,
    },
  },
);

const apiUser = profileResponse.data.user;

return {
  ...profileResponse.data,
  user: {
    ...apiUser,
    _id: apiUser._id,
    name: apiUser.name || apiUser.username || 'Мандрівник',
    avatarUrl: apiUser.avatarUrl || DEFAULT_AVATAR_URL,
    articlesAmount: apiUser.articlesAmount,
  },
};
}

export async function fetchTravellerStoriesServer(
  travellerId: string,
  page: number,
  perPage: number,
): Promise<StoriesResponse> {
  const response = await serverApi.get<StoriesResponse>(
    `/users/${encodeURIComponent(travellerId)}`,
    {
      params: {
        page,
        perPage,
      },
    },
  );

  return response.data;
}
