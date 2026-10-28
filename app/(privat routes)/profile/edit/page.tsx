import { Metadata } from 'next';
import css from './page.module.css';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';

export const metadata: Metadata = {
  title: 'Редагування профілю | Природні мандри',
  robots: { index: false, follow: false },
};

export default function EditProfilePage() {
  return (
    <main className={css.page}>
      <div className="container">
        <h1 className={css.title}>Редагування профілю</h1>
        <EditProfileForm />
      </div>
    </main>
  );
}
