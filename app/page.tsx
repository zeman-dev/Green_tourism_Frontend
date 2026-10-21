import styles from './page.module.css';
import About from '@/components/About/About';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <About />
        <Hero />
      </main>
    </div>
  );
}
