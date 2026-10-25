'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
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

  // Тимчасовий стан для перевірки верстки.
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <HeaderContent
      key={pathname}
      pathname={pathname}
      isAuthenticated={isAuthenticated}
      onLogout={() => setIsAuthenticated(false)}
    />
  );
}

type HeaderContentProps = {
  pathname: string;
  isAuthenticated: boolean;
  onLogout: () => void;
};

function HeaderContent({
  pathname,
  isAuthenticated,
  onLogout,
}: HeaderContentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogout() {
    onLogout();
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
                aria-current={pathname === '/profile' ? 'page' : undefined}
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
                    name="John Doe"
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
                  name="John Doe"
                  onLogout={handleLogout}
                />
              </>
            ) : (
              <div className={css.mobileAuth} onClick={closeMenu}>
                <AuthNavigation variant="header" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}