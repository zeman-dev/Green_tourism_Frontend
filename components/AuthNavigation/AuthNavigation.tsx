'use client';

import { usePathname } from 'next/navigation';
import styles from './AuthNavigation.module.css';
import Link from 'next/link';

export default function AuthNavigation() {
  const pathname = usePathname();

  const isRegisterPage = pathname === '/register';
  const isLoginPage = pathname === '/login';

  return (
    <nav className={styles.navigation} aria-label="Авторизація">
      <Link
        href="/register"
        className={`${styles.link} ${isRegisterPage ? styles.active : ''}`}
        aria-current={isRegisterPage ? 'page' : undefined}
      >
        Реєстрація
      </Link>

      <Link
        href="/login"
        className={`${styles.link} ${isLoginPage ? styles.active : ''}`}
        aria-current={isLoginPage ? 'page' : undefined}
      >
        Вхід
      </Link>
    </nav>
  );
}