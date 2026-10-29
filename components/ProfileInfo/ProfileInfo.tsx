'use client';

import Link from 'next/link';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileInfo.module.css';

export default function ProfileInfo() {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return <p className={`${css.status} container`}>Завантаження профілю...</p>;
  }

  return (
    <>
      <TravellerInfo user={user} />
      <div className="container">
        <Link href="/profile/edit" className={css.editLink}>
          Редагувати профіль
        </Link>
      </div>
    </>
  );
}
