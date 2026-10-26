import { api } from './api';

export type StoryDetailsData = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    category: string;
  };
  rate: number;
  ownerId: {
    _id: string;
    name: string;
  };
  date: string;
};

export const getStoryById = async (
  storyId: string,
): Promise<StoryDetailsData> => {
  const response = await api.get<StoryDetailsData>(`/stories/${storyId}`);

  return response.data;
};