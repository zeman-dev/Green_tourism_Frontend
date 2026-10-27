"use client";
import type { Story } from "@/types/story";

import Image from "next/image"
import Link from "next/link";
import styles from "./StoryCard.module.css";

export type StoryCardProps = {
  story: Story;
  authorName: string;
  savedCount: number;
  isSaved?: boolean;
  isSaving?: boolean;
  onToggleSaved?: () => void | Promise<void>;
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
  isSaved = false,
  isSaving = false,
  onToggleSaved,
  className,
}: StoryCardProps) {
  const cardClassName = className
    ? `${styles.card} ${className}`
    : styles.card;
  
  const bookmarkLabel = isSaved
    ? "Видалити статтю зі збережених"
    : "Зберегти статтю";

  return (
    <article className={cardClassName}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={story.img}
          alt={story.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <p className={styles.author}>{authorName}</p>

          <span
            className={styles.savedCount}
            aria-label={`Збережено ${savedCount} разів`}
          >
            <span>{savedCount}</span>
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
            aria-label={isSaving ? "Збереження статті" : bookmarkLabel}
            aria-pressed={isSaved}
            aria-busy={isSaving}
            disabled={isSaving}
            onClick={onToggleSaved}
          >
            {isSaving ? <LoadingSpinner /> : <BookmarkIcon />}
          </button>
        </div>
      </div>
    </article>
  );
}
