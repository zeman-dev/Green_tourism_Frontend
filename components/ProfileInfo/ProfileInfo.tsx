'use client';

import { useQuery } from '@tanstack/react-query';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import { fetchCurrentUser } from '@/lib/api/profileApi';
import css from './ProfileInfo.module.css';

export default function ProfileInfo() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });

  if (isLoading) {
    return (
      <div className={`${css.status} container`} role="status">
        <span className={css.spinner} aria-hidden="true" />
        Завантаження профілю...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className={`${css.status} ${css.error} container`} role="alert">
        Не вдалося завантажити дані профілю. Спробуйте пізніше.
      </p>
    );
  }

  return <TravellerInfo user={data} />;
}
