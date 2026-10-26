'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import TravellerCard from '@/components/TravellerCard/TravellerCard';
import LoadMore from '@/components/LoadMore/LoadMore';
import { fetchUsers } from '@/lib/api/clientApi';
import styles from './TravellersList.module.css';

const PER_PAGE = 12;

function getErrorMessage(error: unknown) {
    if (!isAxiosError(error)){
        return 'Не вдалося завантажити мандрівників';
    }

    const message = error.response?.data?.message;

    return typeof message === 'string'
    ? message
    : 'Не вдалося завантажити мандрівників';
}

export default function TravellersList(){
    const seenCount = useRef(0);

    const {
        data,
        error,
        isPending,
        isError,
        isFetchNextPageError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey : ['users', 'travellers-page'],
        queryFn: ({pageParam}) =>
            fetchUsers({ page: pageParam, perPage : PER_PAGE}),
        initialPageParam: 1,
        getNextPageParam: (lastPage)=>
            lastPage.page< lastPage.totalPages ? lastPage.page + 1: undefined,
    });

    const users = useMemo(
        () => data?.pages.flatMap((page) => page.users) ?? [],
        [data],
    );

    useEffect(() =>{
    if (seenCount.current > 0 && users.length > seenCount.current){
        const firstNew = users[seenCount.current];

        document.getElementById(`traveller-${firstNew._id}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    seenCount.current = users.length;
},[users]);

if (isPending) {
    return (
    <div className={styles.loaderWrap}>
        <span 
        className={styles.loader}
        role="status"
        aria-label="Завантаження"
        />
    </div>
    );
}

const errorMessage = 
isError || isFetchNextPageError ? getErrorMessage(error): null;

return (
    <div className={styles.section}>
        <h1 className={styles.title}>Мандрівники</h1>

        <ul className={styles.list}>
            {users.map((user) => (
            <li id={`traveller-${user._id}`}
            key={user._id}
            className={styles.item}>
                <TravellerCard user={user}/>
            </li>))}
        </ul>

        <LoadMore
        className={styles.more}
        onLoadMore={() => {
            void fetchNextPage();
        }}
        isLoading={isFetchingNextPage}
        hasMore={Boolean(hasNextPage)}
        />

        {errorMessage && (
            <p className={styles.toast} role='alert'>
                {errorMessage}
            </p>
        )}
        </div>
);

}