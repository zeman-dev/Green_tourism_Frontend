"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { isAxiosError } from "axios";
import styles from "./page.module.css";

import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import LoadMore from "@/components/LoadMore/LoadMore";
import { api } from "@/lib/api/api";
import type { User, UsersApiResponse } from "@/types/user";
import type { StoriesResponse } from "@/types/story";

type TravellerApiResponse = StoriesResponse & {
  user: {
    _id: string;
    username: string;
    articlesAmount: number;
  };
};

type TravellerProfile = StoriesResponse & {
  user: User;
};

export default function TravellerId() {
  const { travellerId } = useParams<{ travellerId: string }>();

  const [profile, setProfile] = useState<TravellerProfile | null>(null);
  const [perPage, setPerPage] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1440px)");

    const updatePageSize = () => {
      setPerPage(desktop.matches ? 6 : 4);
    };

    updatePageSize();
    desktop.addEventListener("change", updatePageSize);

    return () => desktop.removeEventListener("change", updatePageSize);
  }, []);

  useEffect(() => {
    if (!travellerId || perPage === null) return;

    let cancelled = false;

    async function loadProfile() {
      setIsLoading(true);
      setNotFound(false);
      setHasError(false);
      setPage(1);

      try {
        const [profileResponse, usersResponse] = await Promise.all([
          api.get<TravellerApiResponse>(`/users/${travellerId}`, {
            params: { page: 1, perPage },
          }),
          api.get<UsersApiResponse>("/users", {
            params: { page: 1, perPage: 100 },
          }),
        ]);

        if (cancelled) return;

        const user = usersResponse.data.users.find(
          (item) => item._id === travellerId,
        );

        if (!user) {
          setProfile(null);
          setNotFound(true);
          return;
        }

        setProfile({
          ...profileResponse.data,
          user,
        });
      } catch (error) {
        if (cancelled) return;

        setProfile(null);
        setNotFound(
          isAxiosError(error) && error.response?.status === 404,
        );
        setHasError(
          !isAxiosError(error) || error.response?.status !== 404,
        );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [travellerId, perPage]);

  async function loadMore() {
    if (!profile || perPage === null || isLoadingMore) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);

    try {
      const { data } = await api.get<StoriesResponse>(
        `/users/${travellerId}`,
        { params: { page: nextPage, perPage } },
      );

      setProfile((current) =>
        current
          ? {
              ...current,
              ...data,
              user: current.user,
              stories: [...current.stories, ...data.stories],
            }
          : current,
      );

      setPage(nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  }

  if (isLoading) {
  return (
    <main className={`${styles.page} ${styles.statePage}`}>
      <div className={styles.loaderWrapper}>
        <span
          className={styles.loader}
          role="status"
          aria-label="Завантаження"
        />
      </div>
    </main>
  );
}

if (notFound) {
  return (
    <main className={`${styles.page} ${styles.statePage}`}>
      <p className={styles.message}>Такий користувач відсутній</p>
    </main>
  );
}

if (hasError || !profile) {
  return (
    <main className={`${styles.page} ${styles.statePage}`}>
      <p className={styles.message}>Не вдалося завантажити сторінку.</p>
    </main>
  );
}

  return (
    <main className={styles.page}>
      <TravellerInfo user={profile.user} />

      <section className={styles.storiesSection}>
        <h1 className={styles.pageTitle}>Статті Мандрівника</h1>

        {profile.totalStories === 0 ? (
          <MessageNoStories
          text="Цей користувач ще не публікував історій"
          buttonText="Назад до історій"
          linkTo="/stories"
          />
        ) : (
          <>
            <TravellersStories
              stories={profile.stories}
            />

            <LoadMore
              onLoadMore={loadMore}
              isLoading={isLoadingMore}
              hasMore={page < profile.totalPages}
            />
          </>
        )}
      </section>
    </main>
  );
}   