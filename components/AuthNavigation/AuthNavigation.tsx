'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './AuthNavigation.module.css';

type AuthNavigationProps = {
  variant?: 'header' | 'auth';
};

const links = {
  login: { href: '/login', label: 'Вхід' },
  register: { href: '/register', label: 'Реєстрація' },
};

export default function AuthNavigation({
  variant = 'header',
}: AuthNavigationProps) {
  const pathname = usePathname();

  const orderedLinks =
    variant === 'auth'
      ? [links.register, links.login]
      : [links.login, links.register];

  return (
    <nav
      className={[
        styles.navigation,
        styles[variant],
      ].filter(Boolean).join(' ')}
      aria-label="Авторизація"
    >
      {orderedLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={[
            styles.link,
            pathname === href ? styles.active : '',
          ].filter(Boolean).join(' ')}
          aria-current={pathname === href ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}