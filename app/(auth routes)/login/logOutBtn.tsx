// Це кнопка тесту модального вікна. Після тестування її можна звідси прибрати


'use client';

import { useState } from 'react';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

export default function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log('Користувач вийшов');
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Вийти
      </button>
      
      {isModalOpen && (
        <ConfirmModal 
          title="Ви точно хочете вийти?"
          description='Ми будемо сумувати за вами!'
          confirmButtonText="Вийти"
          cancelButtonText="Відмінити"
          onConfirm={handleLogout}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}