'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import styles from './UserBar.module.css';

type UserBarProps = {
  name: string;
  avatarUrl?: string | null;
  onLogout?: () => void | Promise<void>;
};

export default function UserBar({
  name,
  avatarUrl,
  onLogout,
}: UserBarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const photoSrc = avatarUrl?.trim();
  const src =
    photoSrc && failedSrc !== photoSrc
      ? photoSrc
      : '/icons/avatar.svg';

  function openLogoutModal() {
    setError('');
    setIsConfirmOpen(true);
  }

  function closeLogoutModal() {
    if (isLoggingOut) return;

    setIsConfirmOpen(false);
    setError('');
  }

  async function handleLogout() {
    if (!onLogout || isLoggingOut) return;

    setIsLoggingOut(true);
    setError('');

    try {
      await onLogout();
      setIsConfirmOpen(false);
    } catch {
      setError('Не вдалося вийти. Спробуйте ще раз.');
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.userBar}>
        <Link
          href="/profile/saved"
          className={styles.profile}
          aria-label={`Профіль: ${name}`}
        >
          <span className={styles.avatar}>
            <Image
              src={src}
              alt=""
              width={32}
              height={32}
              className={styles.avatarImage}
              unoptimized
              onError={() => {
                if (photoSrc && src === photoSrc) {
                  setFailedSrc(photoSrc);
                }
              }}
            />
          </span>

          <span className={styles.name}>{name}</span>
        </Link>

        {onLogout && (
          <>
            <span
              className={styles.separator}
              aria-hidden="true"
            />

            <button
              type="button"
              className={styles.logout}
              onClick={openLogoutModal}
              disabled={isLoggingOut}
              aria-label="Вийти з акаунта"
            >
              <Image
                src="/icons/logout.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </>
        )}
      </div>


      {isConfirmOpen && (
        <ConfirmModal
          title="Вийти з акаунта?"
          description={
            error || 'Ви впевнені, що хочете вийти з акаунта?'
          }
          confirmButtonText={
            isLoggingOut ? 'Виходимо…' : 'Вийти'
          }
          cancelButtonText="Скасувати"
          onConfirm={handleLogout}
          onCancel={closeLogoutModal}
        />
      )}
    </div>
  );
}