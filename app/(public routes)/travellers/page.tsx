import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import TravellersList from '@/components/TravellersList/TravellersList';
import { fetchUsers } from '@/lib/api/usersApi';
import { TRAVELLERS_PER_PAGE, TRAVELLERS_QUERY_KEY } from '@/lib/constants';
import styles from './page.module.css';

export default async function TravellersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: TRAVELLERS_QUERY_KEY,
    queryFn: ({ pageParam }) =>
      fetchUsers({ page: pageParam, perPage: TRAVELLERS_PER_PAGE }),
    initialPageParam: 1,
  });

  return (
    <main className={styles.page}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TravellersList />
      </HydrationBoundary>
    </main>
  );
}
