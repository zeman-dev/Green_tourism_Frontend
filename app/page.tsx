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
import OurTravellers, {
  PrefetchTravellers,
} from '@/components/OurTravellers/OurTravellers';
<<<<<<< HEAD
import styles from './page.module.css';
=======
>>>>>>> 0ce2c338040418594ed877811e1c007638bd76aa

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
        <About />
        <OurTravellers />
      </main>
    </div>
  );
}
