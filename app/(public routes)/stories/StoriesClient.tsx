'use client';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { fetchStories } from '@/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadMore from '@/components/LoadMore/LoadMore';
import usePerPage from '@/hooks/usePerPage';
import css from './StoriesClient.module.css'


export default function StoriesClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const perPage = usePerPage();
 
   const {
    data,
    isError,
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
    })
      }),
    initialPageParam: 1,

    // definition of next page
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    refetchOnMount: false,
  });

  const stories = data?.pages.flatMap(page => page.stories) ?? [];
 
  if (isError) {
    return <p>Не вдалося завантажити історії.</p>; // переробити на push
  }

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
          </div>
  );
}
