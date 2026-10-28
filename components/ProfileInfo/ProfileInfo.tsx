'use client';

import { useQuery } from '@tanstack/react-query';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import { fetchCurrentUser } from '@/lib/api/clientApi';
import Link from 'next/link';
import css from './ProfileInfo.module.css';

export default function ProfileInfo() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });

  if (isLoading) {
    return <p className={`${css.status} container`}>Завантаження профілю...</p>;
  }

  if (isError || !data) {
    return (
      <p className={`${css.status} container`}>
        Не вдалося завантажити профіль.
      </p>
    );
  }

  return (
    <>
      <TravellerInfo user={data} />
      <div className="container">
        <Link href="/profile/edit" className={css.editLink}>
          Редагувати профіль
        </Link>
      </div>
    </>
  );
}
