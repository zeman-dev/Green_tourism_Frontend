
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

export const saveStory = async (storyId: string) => {
  const response = await api.post(
    `/users/saved-articles/${storyId}`,
  );
  return response.data;
};

export const unsaveStory = async (storyId: string) => {
  const response = await api.delete(
    `/users/saved-articles/${storyId}`,
  );
  return response.data;
};



export const getSavedStories = async () => {
  const response = await api.get('/users/me/saved-stories');
  return response.data;
};