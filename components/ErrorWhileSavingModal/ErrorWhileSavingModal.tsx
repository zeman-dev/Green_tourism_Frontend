'use client';
import css from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal.module.css';
import Modal from '@/components/Modal/Modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ErrorWhileSavingModalProps {
  onClose: () => void;
}

export default function ErrorWhileSavingModal({ onClose }: ErrorWhileSavingModalProps) {

  const router = useRouter();


  const register = () => router.push('/register');

  const login = () => router.push('/login');

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <button
          type="button"
          className={css.closeButton}
          aria-label="Закрити"
          onClick={onClose}
        >
          <Image
            src="/icons/close.svg"
            width={13} 
            height={13}
            alt=""
          />
        </button>
        <div className={css.contentContainer}>
          <h2 className={css.title}>Помилка під час <br /> збереження</h2>
          <p className={css.text}>
            Щоб зберегти статтю вам треба увійти, якщо ще немає <br />облікового
            запису зареєструйтесь
          </p>
          <div className={css.buttons}>
            <button type="button" className={css.loginButton} onClick={login}>
              Увійти
            </button>
            <button
              type="button"
              className={css.registerButton}
              onClick={register}
            >
              Зареєструватись
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
