import styles from './AuthFooter.module.css';

export default function AuthFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© {new Date().getFullYear()} Природні Мандри</p>
    </footer>
  );
}