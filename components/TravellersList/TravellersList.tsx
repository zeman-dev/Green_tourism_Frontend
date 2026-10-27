'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import TravellerCard from '@/components/TravellerCard/TravellerCard';
import LoadMore from '@/components/LoadMore/LoadMore';
import { fetchUsers } from '@/lib/api/usersApi';
import { TRAVELLERS_PER_PAGE, TRAVELLERS_QUERY_KEY } from '@/lib/constants';
import styles from './TravellersList.module.css';

export default function TravellersList() {
  const seenCount = useRef(0);

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: TRAVELLERS_QUERY_KEY,
    queryFn: ({ pageParam }) =>
      fetchUsers({ page: pageParam, perPage: TRAVELLERS_PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const users = data?.pages.flatMap(page => page.users) ?? [];

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message, { id: 'travellers-load-error' });
    }
  }, [isError, error]);

  useEffect(() => {
    if (seenCount.current > 0 && users.length > seenCount.current) {
      const firstNew = users[seenCount.current];

      document.getElementById(`traveller-${firstNew._id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    seenCount.current = users.length;
  }, [users]);

  return (
    <div className={styles.section}>
      <h1 className={styles.title}>Мандрівники</h1>

      <ul className={styles.list}>
        {users.map(user => (
          <li
            id={`traveller-${user._id}`}
            key={user._id}
            className={styles.item}
          >
            <TravellerCard user={user} />
          </li>
        ))}
      </ul>

      <LoadMore
        className={styles.more}
        onLoadMore={fetchNextPage}
        isLoading={isFetchingNextPage}
        hasMore={Boolean(hasNextPage)}
      />
    </div>
  );
}
