'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import LoadMore from '@/components/LoadMore/LoadMore';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import { fetchMyStories, fetchSavedStories } from '@/lib/api/clientApi';
import css from './ProfileStories.module.css';

export default function ProfileStories({ tab }: { tab: string }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['profileStories', tab],
    queryFn: ({ pageParam }) =>
      tab === 'saved'
        ? fetchSavedStories({ page: pageParam, perPage: 6 })
        : fetchMyStories({ page: pageParam, perPage: 6 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
  });

  if (isLoading) {
    return <p className={`${css.status} container`}>Завантаження історій...</p>;
  }

  if (isError && !data) {
    return (
      <p className={`${css.status} container`}>
        Не вдалося завантажити історії.
      </p>
    );
  }

  const stories = data?.pages.flatMap(page => page.stories) ?? [];

  if (stories.length === 0) {
    return (
      <div className="container">
        {tab === 'saved' ? (
          <MessageNoStories
            text="У вас ще немає збережених історій, мершій збережіть вашу першу історію!"
            buttonText="До історій"
            linkTo="/stories"
          />
        ) : (
          <MessageNoStories
            text="Ви ще нічого не публікували, поділіться своєю першою історією!"
            buttonText="Опублікувати історію"
            linkTo="/new-story"
          />
        )}
      </div>
    );
  }

  return (
    <TravellersStories stories={stories}>
      <LoadMore
        onLoadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      />
    </TravellersStories>
  );
}
