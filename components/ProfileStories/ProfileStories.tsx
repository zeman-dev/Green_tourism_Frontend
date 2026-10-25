'use client';

import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import LoadMore from '@/components/LoadMore/LoadMore';
import { fetchProfileStories, type ProfileStory } from '@/lib/api/profileApi';
import {
  PROFILE_STORIES_PER_PAGE,
  type ProfileTab,
} from '@/lib/constants/profileTabs';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type { Story } from '@/types/story';
import css from './ProfileStories.module.css';

const EMPTY_STATE_BY_TAB: Record<
  ProfileTab,
  { text: string; linkLabel: string; href: string }
> = {
  saved: {
    text: 'У вас ще немає збережених історій, мершій збережіть вашу першу історію!',
    linkLabel: 'До історій',
    href: '/stories',
  },
  own: {
    text: 'Ви ще нічого не публікували, поділіться своєю першою історією!',
    linkLabel: 'Опублікувати історію',
    href: '/new-story',
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
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const perPage =
    isDesktop === null
      ? null
      : isDesktop
        ? PROFILE_STORIES_PER_PAGE.desktop
        : PROFILE_STORIES_PER_PAGE.mobile;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['profileStories', tab, perPage],
    queryFn: ({ pageParam }) =>
      fetchProfileStories(tab, { page: pageParam, perPage: perPage! }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < Number(lastPage.totalPages)
        ? allPages.length + 1
        : undefined,
    enabled: perPage !== null,
  });

  if (perPage === null || isLoading) {
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
    const { text, linkLabel, href } = EMPTY_STATE_BY_TAB[tab];

    return (
      <div className="container">
        <div className={css.empty}>
          <p className={css.emptyText}>{text}</p>
          <Link className={css.emptyLink} href={href}>
            {linkLabel}
          </Link>
        </div>
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
