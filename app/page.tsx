
import styles from './page.module.css';
import About from '@/components/About/About';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PopularStories from '@/components/PopularStories/PopularStories';
import { getPopularStories } from '@/lib/api/popularStories';
import Hero from '@/components/Hero/Hero';
import Community from '@/components/Community/Community';

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Community isAuthenticated={false} />
      </main>
    </div>
  );
}
