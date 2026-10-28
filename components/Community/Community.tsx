import css from './Community.module.css';
import Link from 'next/link';
import Image from 'next/image';

type CommunityProps = {
  isAuthenticated: boolean;
};

const Community = ({ isAuthenticated }: CommunityProps) => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <section id="join" className={css.community}>
          <Image
            className={css.picture}
            src="/images/community-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
          />

          <div className={css.content}>
            <h2 className={css.title}>
              Приєднуйся до спільноти свідомих мандрівників
            </h2>

            <p className={css.description}>
              Стань частиною ком’юніті, де подорожі стають не лише пригодою,
              а й внеском у збереження природи. Тут ти знайдеш однодумців,
              поради для сталих мандрів та натхнення для нових маршрутів
              Україною.
            </p>

            <Link
              href={isAuthenticated ? '/profile' : '/register'}
              className={css.joinbtn}
            >
              {isAuthenticated ? 'Збережені статті' : 'Зареєструватися'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Community;