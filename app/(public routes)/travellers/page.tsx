import TravellersList from '@/components/TravellersList/TravellersList';
import styles from './page.module.css';

export default function TravellersPage() {
  return (
    <main className={styles.page}>
      <TravellersList />
    </main>
  );
}