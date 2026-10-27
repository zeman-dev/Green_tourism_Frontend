import axios from 'axios';

import type { StoriesResponse } from '@/types/story';
import type { User, UsersApiResponse } from '@/types/user';

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
  const [profileResponse, usersResponse] = await Promise.all([
    serverApi.get<TravellerResponse>(
      `/users/${encodeURIComponent(travellerId)}`,
      {
        params: {
          page: 1,
          perPage,
        },
      },
    ),
    serverApi.get<UsersApiResponse>('/users', {
      params: {
        page: 1,
        perPage: 100,
      },
    }),
  ]);

  const fullUser = usersResponse.data.users.find(
    user => user._id === travellerId,
  );

  if (!fullUser) {
    throw new Error('Traveller not found');
  }

  return {
    ...profileResponse.data,
    user: {
      ...profileResponse.data.user,
      ...fullUser,
      name:
        fullUser.name ||
        profileResponse.data.user.name ||
        profileResponse.data.user.username ||
        'Мандрівник',
      avatarUrl: fullUser.avatarUrl || profileResponse.data.user.avatarUrl || '',
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
