'use client'

import css from './ConfirmModal.module.css';
import Modal from '@/components/Modal/Modal'
interface ConfirmModalProps {
  title: string;
  description?: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title, 
  description, 
  confirmButtonText, 
  cancelButtonText, 
  onConfirm, 
  onCancel
}: ConfirmModalProps) {
  return (
    <Modal onClose={onCancel}>
      <div className={css.confirmContent}>
        <button
          className={css.closeButton}
          onClick={onCancel}
          aria-label="Закрити модальне вікно"
        >
          &times;
        </button>

        <h2 className={css.title}>{title}</h2>
        {description && <p className={css.description}>{description}</p>}
        
        <div className={css.buttonGroup}>
          <button className={css.cancelBtn} onClick={onCancel}>
            {cancelButtonText}
          </button>
          <button className={css.confirmBtn} onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}