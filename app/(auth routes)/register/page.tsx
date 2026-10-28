import AuthHeader from '../../../components/AuthHeader/AuthHeader';
import RegistrationForm from '../../../components/RegistrationForm/RegistrationForm';
import AuthFooter from '../../../components/AuthFooter/AuthFooter';
import {
  AuthTabs,
  RegisterLink,
  LoginLink,
} from '@/components/AuthTabLinks/AuthTabLinks';

import styles from './page.module.css';


export const metadata = {
  title: 'Реєстрація | Природні Мандри',
  description: 'Створення облікового запису в Природних Мандрах',
};

export default function RegisterPage() {
  return (

    <div className={`${styles.page} `}>
      <AuthHeader />
      <main className={styles.main}>
        <AuthTabs>
          <RegisterLink />
          <LoginLink />
        </AuthTabs>

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
