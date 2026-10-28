'use client';

import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { confirmEmail } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/utils';
import css from './ConfirmEmail.module.css';

export default function ConfirmEmail({ token }: { token?: string }) {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: confirmEmail,
  });
  if (!token) {
    return (
      <div className={css.card}>
        <h1 className={css.title}>Посилання недійсне</h1>
        <p className={css.text}>
          У посиланні немає токена. Спробуйте змінити email ще раз.
        </p>
        <Link href="/profile/edit" className={css.button}>
          До редагування профілю
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={css.card}>
        <h1 className={css.title}>Email змінено</h1>
        <p className={css.text}>
          Нова адреса вже прив’язана до вашого профілю.
        </p>
        <Link href="/profile" className={css.button}>
          До профілю
        </Link>
      </div>
    );
  }

  return (
    <div className={css.card}>
      <h1 className={css.title}>Підтвердження email</h1>
      <p className={css.text}>
        Натисніть кнопку, щоб підтвердити зміну електронної пошти.
      </p>
      {isError && (
        <p className={css.error}>
          {getErrorMessage(error, 'Не вдалося підтвердити email')}
        </p>
      )}
      <button
        type="button"
        className={css.button}
        onClick={() => mutate(token)}
        disabled={isPending}
      >
        {isPending ? 'Підтверджуємо...' : 'Підтвердити'}
      </button>
    </div>
  );
}
