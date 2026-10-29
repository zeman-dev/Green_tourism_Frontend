import { Metadata } from 'next';
import css from './page.module.css';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Редагування профілю | Природні мандри',
  robots: { index: false, follow: false },
};

export default function EditProfilePage() {
  return (
    <>
      <Header />
      <main className={css.page}>
        <div className="container">
          <h1 className={css.title}>Редагування профілю</h1>
          <EditProfileForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
