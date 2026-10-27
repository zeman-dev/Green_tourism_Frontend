'use client';

import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import LoadMore from '@/components/LoadMore/LoadMore';

import { fetchTravellerStories } from '@/lib/api/clientApi';

type Props = {
  travellerId: string;
};

export default function TravellerStoriesClient({
  travellerId,
}: Props) {
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1440px)');

    const updatePageSize = () => {
      setPerPage(desktop.matches ? 6 : 4);
    };

    updatePageSize();

    desktop.addEventListener('change', updatePageSize);

    return () => {
      desktop.removeEventListener('change', updatePageSize);
    };
  }, []);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['travellerStories', travellerId, perPage],

    queryFn: ({ pageParam }) =>
      fetchTravellerStories({
        travellerId,
        page: pageParam,
        perPage,
      }),

    initialPageParam: 1,

    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },

    refetchOnMount: false,
  });

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <p>
        Не вдалося завантажити історії мандрівника.
      </p>
    );
  }

  const stories =
    data?.pages.flatMap(page => page.stories) ?? [];

  return (
    <>
      <TravellersStories stories={stories} />

      <LoadMore
        onLoadMore={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage}
      />
    </>
  );
}