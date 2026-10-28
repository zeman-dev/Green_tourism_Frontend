'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import type { User } from '@/types/user';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../Logo/Logo';
import UserBar from '../UserBar/UserBar';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

import css from './Header.module.css';

const navigationLinks = [
  { href: '/', label: 'Головна' },
  { href: '/stories', label: 'Статті' },
  { href: '/travellers', label: 'Еко-Мандрівники' },
];

export default function Header() {
  const pathname = usePathname();

  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const clear = useAuthStore(state => state.clearIsAuthenticated);

  async function handleLogout() {
    await logout();
    await queryClient.cancelQueries();
    queryClient.clear();
    clear();
    router.replace('/');
    router.refresh();
  }


  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <HeaderContent
      key={pathname}
      pathname={pathname}
      isAuthenticated={isAuthenticated && Boolean(user)}
      user={user}
      onLogout={handleLogout}
    />
  );
}

type HeaderContentProps = {
  pathname: string;
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => Promise<void>;
};

function HeaderContent({
  pathname,
  isAuthenticated,
  user,
  onLogout,
}: HeaderContentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  async function handleLogout() {
    await onLogout();
    closeMenu();
  }

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1440px)');

    function handleResize() {
      if (desktop.matches) {
        setIsMenuOpen(false);
      }
    }

    desktop.addEventListener('change', handleResize);

    return () => {
      desktop.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  function isActiveLink(href: string) {

  if (href === '/') return pathname === '/';


  return pathname === href || pathname.startsWith(`${href}/`);
}

  function renderLinks() {
    return navigationLinks.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className={css.navLink}
        aria-current={pathname === href ? 'page' : undefined}
        onClick={closeMenu}
      >
        {label}
      </Link>
    ));
  }

  return (
    <header
      className={`${css.header} ${isMenuOpen ? css.headerOpen : ''}`}
      onKeyDown={event => {
        if (event.key === 'Escape' && isMenuOpen) {
          closeMenu();
          burgerRef.current?.focus();
        }
      }}
    >
      <div className={css.container}>
        <div className={css.topBar}>
          <Logo />

          <nav
            className={css.desktopNavigation}
            aria-label="Основна навігація"
          >
            {renderLinks()}

            {isAuthenticated && (
              <Link
                href="/profile"
                className={css.navLink}
               aria-current={isActiveLink('/profile') ? 'page' : undefined}
              >
                Мій профіль
              </Link>
            )}
          </nav>

          <div className={css.topActions}>
            {isAuthenticated ? (
              <>
                <Link href="/new-story" className={css.publishLink}>
                  Опублікувати статтю
                </Link>

                <div className={css.desktopUserBar}>
                  <UserBar
                    name={user?.name || 'Мандрівник'}
                    avatarUrl={user?.avatarUrl}
                    onLogout={handleLogout}
                  />
                </div>
              </>
            ) : (
              <AuthNavigation variant="header" />
            )}
          </div>

          <button
            ref={burgerRef}
            type="button"
            className={css.burger}
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
            onClick={() => setIsMenuOpen(previous => !previous)}
          >
            <Image
              src={isMenuOpen ? '/icons/close.svg' : '/icons/burger.svg'}
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>

        <div
          id="header-menu"
          className={css.menuPanel}
          hidden={!isMenuOpen}
        >
          <nav
            className={css.menuNavigation}
            aria-label="Основна навігація"
          >
            {renderLinks()}
          </nav>

          <div className={css.menuBottom}>
            {isAuthenticated ? (
              <>
                <Link
                  href="/new-story"
                  className={`${css.publishLink} ${css.mobilePublish}`}
                  onClick={closeMenu}
                >
                  Опублікувати статтю
                </Link>

                <UserBar
                  name={user?.name || 'Мандрівник'}
                  avatarUrl={user?.avatarUrl}
                  onLogout={handleLogout}
                />
              </>
            ) : (
              <div
                className={css.mobileAuth}
                onClick={closeMenu}
              >
                <AuthNavigation variant="header" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}