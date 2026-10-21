import styles from './page.module.css';
import About from '@/components/About/About';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <About />
      </main>
    </div>
  );
}
