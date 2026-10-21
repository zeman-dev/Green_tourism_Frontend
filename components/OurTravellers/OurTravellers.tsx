'use client'

import { useState } from 'react';
import styles from "./OurTravellers.module.css";
import Link from "next/link";
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import TravellerCard from "../TravellerCard/TravellerCard";
import type { UsersApiResponse } from "../../types/user";
import { fetchUsers } from '@/lib/api/clientApi';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const travellersQueryKey = ['travellers'] as const;

export const travellersQueryFn = () => fetchUsers({
    perPage: 12,
    page: 1,
});

const swiperConfig = {
    spaceBetween: 24,
    navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
    },
    breakpoints: {
        0: {
            direction: 'horizontal',
            slidesPerView: 1,
            slidesPerGroup: 1,
            grid: {
                rows: 3,
                fill: 'row',
            },
        },
        768: {
            direction: 'horizontal',
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: {
                rows: 2,
                fill: 'row',
            },
        },
        1440: {
            direction: 'horizontal',
            slidesPerView: 4,
            slidesPerGroup: 4,
            grid: {
                rows: 1,
            },
        },
    },
} as const;

export function PrefetchTravellers() {
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: travellersQueryKey,
            queryFn: travellersQueryFn,
        });
    }, [queryClient]);

    return null;
}

export default function OurTravellers() {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const { data } = useQuery<UsersApiResponse>({
        queryKey: travellersQueryKey,
        queryFn: travellersQueryFn,
    });

    const users = data?.users ?? [];

    return (
        <>
            <section className={styles.section}>
                <div className={`${styles.sectionContainer} container`}>
                    <h2 className={styles.sectionTitle}>Наші Мандрівники</h2>

                    <div className={styles.swiperContainer}>
                        <Swiper
                            modules={[Grid, Navigation]}
                            spaceBetween={swiperConfig.spaceBetween}
                            navigation={swiperConfig.navigation}
                            onSwiper={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            onSlideChange={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            breakpoints={swiperConfig.breakpoints}
                            >
                            {users.map((user) => (
                                <SwiperSlide key={user._id}>
                                    <TravellerCard user={user} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className={styles.customNavContainer}>
                        <button
                            type="button"
                            aria-label="Previous travellers"
                            className={`${styles.customPrev} custom-prev`}
                            disabled={isBeginning}
                        >
                            <svg className={styles.navIcon} aria-hidden="true">
                                <use href="/icons/our-travellers-nav.svg#icon-chevron-left" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            aria-label="Next travellers"
                            className={`${styles.customNext} custom-next`}
                            disabled={isEnd}
                        >
                            <svg className={styles.navIcon} aria-hidden="true">
                                <use href="/icons/our-travellers-nav.svg#icon-chevron-right" />
                            </svg>
                        </button>
                    </div>

                    <Link className={styles.sectionButton} href="/travellers">Всі мандрівники</Link>
                </div>
            </section>
        </>
    )
}