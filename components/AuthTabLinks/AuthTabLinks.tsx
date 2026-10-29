'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import css from './AuthTabLinks.module.css';

// ⚠️ Поменяй, если у тебя другие пути
const LOGIN_HREF = '/login';
const REGISTER_HREF = '/register';

type TabLinkProps = {
  href: string;
  children: ReactNode;
};

function TabLink({ href, children }: TabLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${css.link} ${isActive ? css.active : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}

export function RegisterLink() {
  return <TabLink href={REGISTER_HREF}>Реєстрація</TabLink>;
}

export function LoginLink() {
  return <TabLink href={LOGIN_HREF}>Вхід</TabLink>;
}


export function AuthTabs({ children }: { children: ReactNode }) {
  return <nav className={css.tabs}>{children}</nav>;
}
