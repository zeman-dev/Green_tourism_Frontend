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
// import Modal from '@/components/ConfirmModal/ConfirmModal';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['popularStories'],
    queryFn: getPopularStories,
  });


  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <Hero />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <PopularStories />
        </HydrationBoundary>

        <PrefetchTravellers />
        <About />
        <OurTravellers />
        <Community isAuthenticated={false} />
      </main>

      <Footer />
    </div>
  );
}
