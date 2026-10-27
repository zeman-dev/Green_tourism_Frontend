
'use client';

import styles from './ErrorWhileSavingModal.module.css';

type ErrorWhileSavingModalProps = {
  onClose: () => void;
};

export default function ErrorWhileSavingModal({
  onClose,
}: ErrorWhileSavingModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити вікно"
        >
          ×
        </button>

        <h2 id="save-modal-title" className={styles.title}>
          Увійдіть у свій профіль
        </h2>

        <p className={styles.description}>
          Щоб зберегти історію, потрібно увійти або зареєструватися.
        </p>

        <a href="/login" className={styles.link}>
          Увійти
        </a>
      </div>
    </div>
  );
}
