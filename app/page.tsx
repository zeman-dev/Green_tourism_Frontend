import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PopularStories from '@/components/PopularStories/PopularStories';
import { getPopularStories } from '@/lib/api/popularStories';
import Hero from '@/components/Hero/Hero';
import styles from './page.module.css';
import OurTravellers, { PrefetchTravellers } from "@/components/OurTravellers/OurTravellers";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['popularStories'],
    queryFn: getPopularStories,
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PopularStories />
        </HydrationBoundary>
        <PrefetchTravellers />
        <OurTravellers />
      </main>
    </div>
  );
}