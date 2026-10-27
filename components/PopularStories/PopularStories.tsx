'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getPopularStories } from '@/lib/api/popularStories';
import PopularStoriesSlider from './PopularStoriesSlider';
import styles from './PopularStories.module.css';

export default function PopularStories() {
  const {
    data: stories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['popularStories'],
    queryFn: getPopularStories,
  });
  if (isLoading) {
    return <p className={styles.section}>Завантаження...</p>;
  }

  if (isError && !stories) {
    return (
      <section className={styles.section}>
        <p>Не вдалось завантажити популярні статті.</p>
      </section>
    );
  }

  if (!stories || stories.length === 0) {
  return null;
}
  return (
    <section className={styles.section}>
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
        <h2 className={styles.title}>Популярні статті</h2>
      </div>

      <div className={styles.slider}>
        <PopularStoriesSlider stories={stories} />
      </div>

      <Link className={styles.allStories} href="/stories">
          Всі статті
        </Link>
      </div>
    </section>
  );
}
