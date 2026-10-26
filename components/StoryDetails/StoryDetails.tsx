import Image from 'next/image';
import Link from 'next/link';

import type { StoryDetailsData } from '@/lib/api/storyApi';
import styles from './StoryDetails.module.css';

type StoryDetailsProps = {
  story: StoryDetailsData;
};

export default function StoryDetails({ story }: StoryDetailsProps) {
  const formattedDate = new Date(story.date).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.info}>
          <Link href="/stories" className={styles.backLink}>
            <span aria-hidden="true">‹</span>
            Всі статті
          </Link>

          <h1 className={styles.title}>{story.title}</h1>

          <div className={styles.meta}>
            <p className={styles.metaRow}>
              <span className={styles.metaLabel}>Автор статті</span>
              <span className={styles.metaValue}>{story.ownerId.name}</span>
            </p>

            <p className={styles.metaRow}>
              <span className={styles.metaLabel}>Опубліковано</span>
              <span className={styles.metaValue}>{formattedDate}</span>
            </p>

            <span className={styles.category}>
              {story.category.category}
            </span>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={story.img}
            alt={story.title}
            fill
            className={styles.image}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1439px) calc(100vw - 64px), 755px"
          />
        </div>
      </div>

      <div className={styles.article}>
        <p>{story.article}</p>
      </div>
    </section>
  );
}