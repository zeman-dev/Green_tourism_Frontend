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
import OurTravellers, {
  PrefetchTravellers,
} from '@/components/OurTravellers/OurTravellers';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
<<<<<<< HEAD
=======
// import Modal from '@/components/ConfirmModal/ConfirmModal';
>>>>>>> a1c64c23d45292562006d9b495bca00f22258421

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['popularStories'],
    queryFn: getPopularStories,
  });


  return (
    <div className={styles.page}>
      <Header />
<<<<<<< HEAD
=======
      
>>>>>>> a1c64c23d45292562006d9b495bca00f22258421
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
