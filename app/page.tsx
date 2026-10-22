import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import Community from '@/components/Community/Community';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Community isAuthenticated={false} />
      </main>
    </div>
  );
}
