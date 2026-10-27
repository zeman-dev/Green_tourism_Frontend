'use client';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { fetchStories } from '@/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import LoadMore from '@/components/LoadMore/LoadMore';
import usePerPage from '@/hooks/usePerPage';
import css from './StoriesClient.module.css';
import { Toaster, toast } from 'react-hot-toast';

export default function StoriesClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const perPage = usePerPage();

  const {
    data,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', selectedCategory, perPage],
    queryFn: ({ pageParam }) =>
      fetchStories({
        page: pageParam,
        perPage,
        ...(selectedCategory !== 'all' && {
          category: selectedCategory,
        }),
      }),
    initialPageParam: 1,

    // definition of next page====
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    //=============================
    refetchOnMount: false,
  });
console.log(data);//прибрати після тестів
  const stories = data?.pages.flatMap(page => page.stories) ?? [];

  useEffect(() => {
    if (isError) {
      toast.error(`Не вдалося завантажити історії. ${error}`);
    }
  }, [isError]);

  if (isLoading) {
    return <p className={css.loading}>Завантаження історій...</p>;
  }

  // заготовка, має йти після h1: <CategoriesFilter  selectedCategory={selectedCategory}  onCategoryChange={setSelectedCategory}/>
  return (
    <div className={css.storiespage}>
      <h1>Статті</h1>
      <TravellersStories stories={stories}>
        <LoadMore
          onLoadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          isLoading={isFetchingNextPage}
        />
      </TravellersStories>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '16px',
            padding: '10px 14px',
            maxWidth: '360px',
            width: 'auto',
            whiteSpace: 'nowrap',
          },
        }}
      />
    </div>
  );
}
