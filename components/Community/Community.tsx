
import css from './Community.module.css';
import Link from 'next/link';
import Image from 'next/image';

type CommunityProps = {
  isAuthenticated: boolean;
};

const Community = ({ isAuthenticated }: CommunityProps) => {
  return (
    <section id="join" className={css.community}>
      <Image
        className={css.picture}
        src="/images/fern.png"
        alt="Зелене листя папороті"
        fill
        sizes="100vw"
      />

      <div className={css.content}>
        <h2 className={css.title}>
          Приєднуйся до спільноти свідомих мандрівників
        </h2>

        <p className={css.description}>
          Стань частиною ком’юніті, де подорожі стають не лише пригодою,
          а й внеском у збереження природи. Тут ти знайдеш однодумців,
          поради для сталих мандрів та натхнення для нових маршрутів Україною.
        </p>

        <Link
          href={isAuthenticated ? '/auth/profile' : '/auth/register'}
          className={css.joinbtn}
        >
          {isAuthenticated ? 'Збережені статті' : 'Зареєструватися'}
        </Link>
      </div>
    </section>
  );
};

export default Community;
