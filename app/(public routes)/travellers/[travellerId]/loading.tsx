import styles from './page.module.css';

export default function Loading() {
  return (
    <main className={`${styles.page} ${styles.statePage}`}>
      <div className={styles.loaderWrapper}>
        <span
          className={styles.loader}
          role="status"
          aria-label="Завантаження"
        />
      </div>
    </main>
  );
}