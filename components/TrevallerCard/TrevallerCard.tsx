import styles from "./TrevallerCard.module.css";

import Image from "next/image";
import Link from "next/link";

export type TravellerUser = {
  _id: string;
  username: string;
  articlesAmount: number;
  /** The API currently returns `avatar`; the model stores `avatarUrl`. */
  avatar?: string | null;
  avatarUrl?: string | null;
};

export type TrevallerCardProps = {
  user: TravellerUser;
  className?: string;
};

export default function TrevallerCard({
  user,
  className,
}: TrevallerCardProps) {
  const cardClassName = className
    ? `${styles.card} ${className}`
    : styles.card;
  const avatarUrl = user.avatarUrl || user.avatar;

  return (
    <article className={cardClassName}>
      {avatarUrl ? (
        <Image
          className={styles.avatar}
          src={avatarUrl}
          alt={`${user.username} — фото профілю`}
          width={130}
          height={130}
          unoptimized
        />
      ) : (
        <div
          className={styles.avatar}
          role="img"
          aria-label={`Фото профілю ${user.username} відсутнє`}
        />
      )}

      <div className={styles.content}>
        <div className={styles.details}>
          <h3 className={styles.name}>{user.username}</h3>
          <p className={styles.articleCount}>
            Статей: {user.articlesAmount}
          </p>
        </div>

        <Link
          className={styles.profileButton}
          href={`/travellers/${encodeURIComponent(user._id)}`}
        >
          Переглянути профіль
        </Link>
      </div>
    </article>
  );
}
