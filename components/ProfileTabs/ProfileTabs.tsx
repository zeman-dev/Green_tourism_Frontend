'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROFILE_TABS } from '@/lib/constants/profileTabs';
import css from './ProfileTabs.module.css';

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <nav className={`${css.nav} container`} aria-label="Розділи профілю">
      <ul className={css.list}>
        {PROFILE_TABS.map(tab => {
          const isActive =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <li className={css.item} key={tab.slug}>
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
