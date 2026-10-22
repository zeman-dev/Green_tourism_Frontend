"use client";
import type { Story } from "@/types/story";

import Link from "next/link";
import styles from "./StoryCard.module.css";

export type StoryCardProps = {
  story: Story;
  authorName: string;
  savedCount: number;
  isSaved?: boolean;
  isSaving?: boolean;
  onToggleSaved?: () => void;
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

  return (
    <article className={cardClassName}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={story.img} alt="" />
        <span className={styles.savedCount} aria-label={`Збережено ${savedCount} разів`}>
          <BookmarkIcon />
          <span>{savedCount}</span>
        </span>
      </div>

      <div className={styles.content}>
        <p className={styles.author}>{authorName}</p>
        <h3 className={styles.title}>{story.title}</h3>
        <div className={styles.footer}>
          <Link className={styles.readButton} href={`/stories/${encodeURIComponent(story._id)}`}>Переглянути статтю</Link>
          <button type="button" className={styles.bookmarkButton} aria-label="Зберегти статтю" aria-pressed={isSaved} aria-busy={isSaving} disabled={isSaving} onClick={onToggleSaved}>
            <BookmarkIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
