import type { StoriesResponse, Story } from '@/types/story';

export async function getPopularStories(): Promise<Story[]> {
<<<<<<< HEAD
  const response = await fetch(
    '/stories?type=popular'
  );
=======
  const response = await fetch('/api/stories?type=popular');
>>>>>>> 1232b72c658c7f8efdff994deff393cb5f4115f4

  if (!response.ok) {
    throw new Error('Не вдалося завантажити статті');
  }

  const data: StoriesResponse = await response.json();

  return data.stories;
}
