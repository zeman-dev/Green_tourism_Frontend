'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './ProfileTabs.module.css';

const tabs = [
  { href: '/profile/saved', label: 'Збережені історії' },
  { href: '/profile/own', label: 'Мої історії' },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <nav className={`${css.nav} container`} aria-label="Розділи профілю">
      <ul className={css.list}>
        {tabs.map(tab => {
          const isActive = pathname === tab.href;

          return (
            <li className={css.item} key={tab.href}>
              <Link
                href={tab.href}
                scroll={false}
                className={isActive ? `${css.link} ${css.active}` : css.link}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
