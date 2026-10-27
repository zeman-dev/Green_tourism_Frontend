
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import StoryDetails from '@/components/StoryDetails/StoryDetails';
import SaveStory from '@/components/SaveStory/SaveStory';
import RecommendedStories from '@/components/RecommendedStories/RecommendedStories';

import {
  getStoryById,
  type StoryDetailsData,
} from '@/lib/api/storyApi';

import styles from './page.module.css';

export default function StoryPage() {
  const params = useParams<{ storyId: string }>();

  const [story, setStory] = useState<StoryDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const loadStory = async () => {
      try {
        setIsLoading(true);
        setIsNotFound(false);

        const data = await getStoryById(params.storyId);
        setStory(data);
      } catch {
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.storyId) {
      loadStory();
    }
  }, [params.storyId]);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.loaderWrapper}>
          <span className={styles.loader} aria-label="Завантаження" />
        </div>
      </main>
    );
  }

  if (isNotFound || !story) {
    return (
      <main className={styles.page}>
        <p className={styles.message}>Така історія відсутня</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <StoryDetails story={story} />

      <SaveStory
        storyId={story._id}
        isAuthenticated={false}
      />

      <RecommendedStories currentStoryId={story._id} />
    </main>
  );
}
