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
import {
  PrefetchTravellers,
} from '@/components/OurTravellers/OurTravellers';
import OurTravellers from '@/components/OurTravellers/OurTravellers';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['popularStories'],
    queryFn: getPopularStories,
  });

  return (
    <div className={styles.page}>
<<<<<<< HEAD
      <Header />
      
=======
   

>>>>>>> 8f854ed (fix story page)
      <main className={styles.main}>
        <Hero />
        <Community isAuthenticated={false} />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <PopularStories />
        </HydrationBoundary>

        <PrefetchTravellers />
        <About />
        <OurTravellers />
      </main>

      <Footer />
    </div>
  );
}
