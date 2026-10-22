import type { StoriesResponse, Story } from '@/types/story';

export async function getPopularStories(): Promise<Story[]> {
  const response = await fetch(
    '/stories?type=popular'
  );

  if (!response.ok) {
    throw new Error('Не вдалося завантажити статті');
  }

  const data: StoriesResponse = await response.json();

  return data.stories;
}
