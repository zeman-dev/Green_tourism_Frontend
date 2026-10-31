'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { Story } from '@/types/story';
import { saveStory, unsaveStory } from '@/lib/api/storyApi';
import { useAuthStore } from '@/lib/store/authStore';
import { getErrorMessage } from '@/lib/utils';
import ErrorWhileSavingModal from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';
import styles from './StoryCard.module.css';

export type StoryCardProps = {
  story: Story;
  authorName: string;
  savedCount: number;
  className?: string;
};

function BookmarkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 4.75A1.75 1.75 0 0 1 8.5 3h7a1.75 1.75 0 0 1 1.75 1.75V21l-5.25-3.5L6.75 21V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return <span className={styles.spinner} aria-hidden="true" />;
}

export default function StoryCard({
  story,
  authorName,
  savedCount,
  className,
}: StoryCardProps) {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setUser = useAuthStore(state => state.setUser);

  const [count, setCount] = useState(savedCount);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSaved = user?.savedArticles?.includes(story._id) ?? false;

  const { mutate, isPending } = useMutation({
    mutationFn: () => (isSaved ? unsaveStory(story._id) : saveStory(story._id)),
    onSuccess: data => {
      if (user) setUser({ ...user, savedArticles: data.savedArticles });
      setCount(current => (isSaved ? current - 1 : current + 1));
      queryClient.invalidateQueries({ queryKey: ['profileStories'] });
    },
    onError: error => {
      toast.error(
        getErrorMessage(error, 'Не вдалося оновити збережені історії')
      );
    },
  });

  const handleBookmarkClick = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    mutate();
  };

  const cardClassName = className ? `${styles.card} ${className}` : styles.card;

  const bookmarkLabel = isSaved
    ? 'Видалити статтю зі збережених'
    : 'Зберегти статтю';

  return (
    <article className={cardClassName}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={story.img}
          alt={story.title}
          fill
          sizes="(min-width: 100%; height:100%) 100vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <p className={styles.author}>{authorName}</p>

          <span
            className={styles.savedCount}
            aria-label={`Збережено ${count} разів`}
          >
            <span>{count}</span>
            <BookmarkIcon />
          </span>
        </div>

        <h3 className={styles.title}>{story.title}</h3>

        <div className={styles.footer}>
          <Link
            className={styles.readButton}
            href={`/stories/${encodeURIComponent(story._id)}`}
          >
            Переглянути статтю
          </Link>

          <button
            type="button"
            className={styles.bookmarkButton}
            aria-label={isPending ? 'Збереження статті' : bookmarkLabel}
            aria-pressed={isSaved}
            aria-busy={isPending}
            disabled={isPending}
            onClick={handleBookmarkClick}
          >
            {isPending ? <LoadingSpinner /> : <BookmarkIcon />}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ErrorWhileSavingModal onClose={() => setIsModalOpen(false)} />
      )}
    </article>
  );
}
