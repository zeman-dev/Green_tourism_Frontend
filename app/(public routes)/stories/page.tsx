import StoriesClient from './StoriesClient';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchStories } from '@/lib/api/clientApi';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

async function StoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stories'],
    queryFn: () => fetchStories({}),
  });

  return (
    <>
    <Header/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient />
    </HydrationBoundary>
    <Footer/>
    </>
  );
}

export default StoriesPage;
