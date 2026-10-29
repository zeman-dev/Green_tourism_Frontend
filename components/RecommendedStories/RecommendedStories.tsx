
'use client';

import { useQuery } from '@tanstack/react-query';

import StoryCard from '@/components/StoryCard/StoryCard';
import { getPopularStories } from '@/lib/api/popularStories';
import type { Story } from '@/types/story';

import styles from './RecommendedStories.module.css';

type RecommendedStoriesProps = {
  currentStoryId: string;
};

export default function RecommendedStories({
  currentStoryId,
}: RecommendedStoriesProps) {
  const { data: stories, isLoading, isError } = useQuery({
    queryKey: ['recommendedStories'],
    queryFn: getPopularStories,
  });

  if (isLoading) {
    return <p className={styles.status}>Завантаження історій...</p>;
  }

  if (isError || !stories) {
    return null;
  }

  const recommended = stories
    .filter((story: Story) => story._id !== currentStoryId)
    .slice(0, 3);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Вам також сподобається</h2>

      <div className={styles.list}>
        {recommended.map((story: Story) => (
          <StoryCard
            key={story._id}
            story={story}
            authorName="Мандрівник"
            savedCount={story.rate ?? 0}
          />
        ))}
      </div>
    </section>
  );
}
