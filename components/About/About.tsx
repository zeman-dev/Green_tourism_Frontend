import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.intro}>
            <h2 className={styles.title}>
              Мандруй екологічно та відкривай нові горизонти
            </h2>

            <p className={styles.description}>
              Наш проєкт створений для тих, хто хоче досліджувати Україну
              відповідально. Ми допоможемо знайти унікальні маршрути, які
              поєднують красу природи, локальну культуру та принципи сталого
              туризму.
            </p>
          </div>

          <div className={styles.textWrapper}>
            <div className={styles.textItem}>
              <h3 className={styles.subtitle}>Еко-маршрути по Україні</h3>

              <p className={styles.description}>
                Від Карпат до Чорного моря — добірка локацій, де можна
                подорожувати без шкоди для довкілля.
              </p>
            </div>

            <div className={styles.textItem}>
              <h3 className={styles.subtitle}>Практичні екологічні поради</h3>

              <p className={styles.description}>
                Дізнайся, як зменшити свій екологічний слід під час мандрів та
                зробити подорож комфортною й свідомою.
              </p>
            </div>
          </div>
        </div>

        <Image
          src="/images/about.jpg"
          alt="Краєвиди України"
          width={1200}
          height={800}
          sizes="(max-width: 767px) 100vw, (max-width: 1439px) 100vw, 50vw"
          className={styles.image}
        />
      </div>
    </section>
  );
}
