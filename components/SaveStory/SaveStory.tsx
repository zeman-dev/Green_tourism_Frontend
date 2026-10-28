
'use client';

import { useState } from 'react';
import { saveStory, unsaveStory } from '@/lib/api/storyApi';
import ErrorWhileSavingModal from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';
import styles from './SaveStory.module.css';

type SaveStoryProps = {
  storyId: string;
  isAuthenticated: boolean;
  initiallySaved?: boolean;
};

export default function SaveStory({
  storyId,
  isAuthenticated,
  initiallySaved = false,
}: SaveStoryProps) {
  const [isSaved, setIsSaved] = useState(initiallySaved);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggleSaved = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage('');

      if (isSaved) {
        await unsaveStory(storyId);
        setIsSaved(false);
      } else {
        await saveStory(storyId);
        setIsSaved(true);
      }
    } catch {
      setErrorMessage('Не вдалося зберегти історію. Спробуйте ще раз.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Збережіть собі історію</h2>

      <p className={styles.description}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <button
        type="button"
        className={styles.button}
        onClick={handleToggleSaved}
        disabled={isSaving}
      >
        {isSaving
          ? 'Завантаження...'
          : isSaved
            ? 'Видалити зі збережених'
            : 'Зберегти'}
      </button>

      {showAuthModal && (
        <ErrorWhileSavingModal
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {errorMessage && (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      )}
    </section>
  );
}
