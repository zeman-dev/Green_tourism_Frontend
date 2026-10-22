import css from './Hero.module.css';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className={css.container}>
      <section className={css.hero}>
        <Image
          className={css.picture}
          src="/images/hero.jpg"
          alt="Краєвид української природи"
          width={280}
          height={469}
          sizes="50vw"
        ></Image>
        <div className={css.textbox}>
          <h1>Відкрий Україну заново — еко-мандри для натхнення</h1>
          <p>
            Подорожуй екологічно, відкривай заповідні місця, гори та річки
            України. Ми зібрали маршрути, які допоможуть побачити красу природи
            без шкоди для неї.
          </p>
          <a href="#join" className={css.joinbtn}>
            Доєднатись до мандрів
          </a>
        </div>
      </section>
    </div>
  );
};

export default Hero;
