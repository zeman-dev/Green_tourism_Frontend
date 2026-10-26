import StoriesClient from './StoriesClient';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchStories } from '@/lib/api/clientApi';

async function StoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stories'],
    queryFn: () => fetchStories({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient />
    </HydrationBoundary>
  );
}

export default StoriesPage;
