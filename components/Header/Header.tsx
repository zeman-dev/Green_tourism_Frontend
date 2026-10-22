'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../Logo/Logo';

import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';

const navigationLinks = [
  { href: '/', label: 'Головна' },
  { href: '/stories', label: 'Статті' },
  { href: '/travellers', label: 'Еко-Мандрівники' },
];

export default function Header() {
  const pathname = usePathname();

  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1440px)');

    const handleResize = () => {
      if (desktop.matches) {
        setIsMenuOpen(false);
      }
    };

    desktop.addEventListener('change', handleResize);

    return () => {
      desktop.removeEventListener('change', handleResize);
    };
  }, []);

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
        <Logo />

        <button
          ref={burgerRef}
          type="button"
          className={css.burger}
          aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isMenuOpen}
          aria-controls="header-navigation"
          onClick={() => setIsMenuOpen(previous => !previous)}
        >
          <Image
            src={isMenuOpen ? 'icons/close.svg' : 'icons/burger.svg'}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>

        <nav
          id="header-navigation"
          className={css.navigation}
          aria-label="Основна навігація"
        >
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={css.navLink}
              aria-current={pathname === href ? 'page' : undefined}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={css.authNavigation}>
          <AuthNavigation />
        </div>
      </div>
    </header>
  );
}
