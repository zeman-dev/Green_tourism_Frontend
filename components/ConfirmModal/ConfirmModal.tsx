'use client'

import { createPortal } from 'react-dom';
import css from './ConfirmModal.module.css'
import { useEffect } from 'react';
import type { MouseEvent } from 'react';

interface ConfirmModalProps{
    title: string;
    description?: string;
    confirmButtonText: string;
    cancelButtonText: string;
    onConfirm: () => void;
    onCancel: ()=> void;
}

export default function ConfirmModal({
    title, description, confirmButtonText, cancelButtonText, onConfirm, onCancel
}: ConfirmModalProps) {

useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

    return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
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
    </div>,
    document.body
  );
}