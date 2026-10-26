'use client';

import type { ComponentProps } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import LoadMore from '@/components/LoadMore/LoadMore';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import {
  fetchProfileStories,
  PROFILE_STORIES_KEY,
  type ProfileStory,
} from '@/lib/api/profileApi';
import {
  PROFILE_STORIES_PER_PAGE,
  type ProfileTab,
} from '@/lib/constants/profileTabs';
import type { Story } from '@/types/story';
import css from './ProfileStories.module.css';

const EMPTY_STATE_BY_TAB: Record<
  ProfileTab,
  ComponentProps<typeof MessageNoStories>
> = {
  saved: {
    text: 'У вас ще немає збережених історій, мершій збережіть вашу першу історію!',
    buttonText: 'До історій',
    linkTo: '/stories',
  },
  own: {
    text: 'Ви ще нічого не публікували, поділіться своєю першою історією!',
    buttonText: 'Опублікувати історію',
    linkTo: '/new-story',
  },
};

const toStory = ({ ownerId, ...story }: ProfileStory): Story => ({
  ...story,
  ownerId: ownerId?._id ?? '',
});

interface ProfileStoriesProps {
  tab: ProfileTab;
}

export default function ProfileStories({ tab }: ProfileStoriesProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [...PROFILE_STORIES_KEY, tab],
    queryFn: ({ pageParam }) =>
      fetchProfileStories(tab, {
        page: pageParam,
        perPage: PROFILE_STORIES_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < Number(lastPage.totalPages)
        ? allPages.length + 1
        : undefined,
  });

  if (isLoading) {
    return (
      <div className={`${css.status} container`} role="status">
        <span className={css.spinner} aria-hidden="true" />
        Завантаження історій...
      </div>
    );
  }

  if (isError && !data) {
    return (
      <p className={`${css.status} ${css.error} container`} role="alert">
        Не вдалося завантажити історії. Спробуйте пізніше.
      </p>
    );
  }

  const stories = data?.pages.flatMap(page => page.stories).map(toStory) ?? [];

  if (stories.length === 0) {
    return (
      <div className="container">
        <MessageNoStories {...EMPTY_STATE_BY_TAB[tab]} />
      </div>
    );
  }

  return (
    <>
      <TravellersStories stories={stories} />
      {isError && (
        <p className={`${css.error} ${css.nextPageError}`} role="alert">
          Не вдалося завантажити наступні історії. Спробуйте ще раз.
        </p>
      )}
      <div className={css.loadMore}>
        <LoadMore
          onLoadMore={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          hasMore={!!hasNextPage}
        />
      </div>
    </>
  );
}
