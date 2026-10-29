import { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import type { StoriesResponse } from '@/types/story';

import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

import {
  fetchTravellerProfileServer,
  fetchTravellerStoriesServer,
} from '@/lib/api/travellerApi';

import TravellerStoriesClient from '../TravellerStoriesClient';

import styles from './page.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

type TravellerPageProps = {
  params: Promise<{
    travellerId: string;
  }>;
};

export default async function TravellerPage({
  params,
}: TravellerPageProps) {
  const { travellerId } = await params;

  const queryClient = new QueryClient();

  let profile;

 try {
  const [profileData] = await Promise.all([
    fetchTravellerProfileServer(travellerId, 6),

    queryClient.prefetchInfiniteQuery({
      queryKey: ['travellerStories', travellerId, 6],

      queryFn: ({ pageParam }) =>
        fetchTravellerStoriesServer(
          travellerId,
          pageParam,
          6,
        ),

      initialPageParam: 1,

      getNextPageParam: (lastPage: StoriesResponse) => {
  if (lastPage.page < lastPage.totalPages) {
    return lastPage.page + 1;
  }

  return undefined;
},
    }),
  ]);

  profile = profileData;
} catch (error) {
  if (
    (isAxiosError(error) && error.response?.status === 404) ||
    (error instanceof Error && error.message === 'Traveller not found')
  ) {
    notFound();
  }
  return (
    <main className={`${styles.page} ${styles.statePage}`}>
      <p className={styles.message}>Не вдалося завантажити сторінку.</p>
    </main>
  );
  }

  return (
    <>
    
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header/>
      <main className={styles.page}>
        <TravellerInfo user={profile.user} />

        <section className={styles.storiesSection}>
          <h1 className={styles.pageTitle}>
            Статті Мандрівника
          </h1>

          {profile.totalStories === 0 ? (
            <MessageNoStories
              text="Цей користувач ще не публікував історій"
              buttonText="Назад до історій"
              linkTo="/stories"
            />
          ) : (
            <TravellerStoriesClient travellerId={travellerId} />
          )}
        </section>
      </main>
      <Footer/>
    </HydrationBoundary>
    
  </>
  );
  
}