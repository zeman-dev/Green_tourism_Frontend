'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="auth-switcher">
      <Link 
        href="/sign-up" 
        className={pathname === '/sign-up' ? 'active-tab' : 'inactive-tab'}
      >
        Реєстрація
      </Link>
      <Link 
        href="/sign-in" 
        className={pathname === '/sign-in' ? 'active-tab' : 'inactive-tab'}
      >
        Вхід
      </Link>
    </div>
  );
};

export default AuthNavigation;