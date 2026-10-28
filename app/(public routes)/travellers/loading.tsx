import styles from './page.module.css';

export default function TravellersLoading() {
  return (
    <main className={styles.page}>
      <div className={styles.loaderWrap}>
        <span
          className={styles.loader}
          role="status"
          aria-label="Завантаження"
        />
      </div>
    </main>
  );
}
