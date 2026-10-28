// import { Montserrat } from 'next/font/google';

import AuthHeader from '../../../components/AuthHeader/AuthHeader';
import AuthNavigation from '../../../components/AuthNavigation/AuthNavigation';
import RegistrationForm from '../../../components/RegistrationForm/RegistrationForm';
import AuthFooter from '../../../components/AuthFooter/AuthFooter';

import styles from './page.module.css';

// Vercel видає помилку через імпорт цього шрифту
// const montserrat = Montserrat({
//   subsets: ['latin', 'cyrillic'],
//   weight: ['400', '500', '700'],
// });


export const metadata = {
  title: 'Реєстрація | Природні Мандри',
  description: 'Створення облікового запису в Природних Мандрах',
};

export default function RegisterPage() {
  return (
    <div className={`${styles.page} `}> {/*${montserrat.className}*/}
      <AuthHeader />

      <main className={styles.main}>
        <AuthNavigation />

        <section className={styles.content}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Реєстрація</h1>

            <p className={styles.subtitle}>
              Раді вас бачити у спільноті мандрівників!
            </p>
          </div>

          <RegistrationForm />
        </section>
      </main>

      <AuthFooter />
    </div>
  );
}