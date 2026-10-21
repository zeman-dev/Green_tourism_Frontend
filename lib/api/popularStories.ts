import type { StoriesResponse, Story } from '@/types/story';

export async function getPopularStories(): Promise<Story[]> {
    const response = await fetch(
        'https://green-tourism-backend.onrender.com/api/stories?type=popular&page=1&perPage=10'
    );

    if(!response.ok){
        throw new Error('Не вдалося завантажити статті');
    }

    const data: StoriesResponse = await response.json();

    return data.stories.slice(0,10);
    
}
