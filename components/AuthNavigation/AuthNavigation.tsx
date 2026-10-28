'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AuthNavigation.module.css';

type Props = { variant?: 'header' | 'auth' };
const login = { href: '/login', label: 'Вхід' };
const register = { href: '/register', label: 'Реєстрація' };

export default function AuthNavigation({ variant = 'header' }: Props) {
  const pathname = usePathname();
  const links = variant === 'auth' ? [register, login] : [login, register];
  return (
    <nav className={`${styles.navigation} ${styles[variant]}`} aria-label="Авторизація">
      {links.map(({ href, label }) => (
        <Link key={href} href={href}
          className={`${styles.link} ${pathname === href ? styles.active : ''}`}
          aria-current={pathname === href ? 'page' : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
