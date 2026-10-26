import { Metadata } from 'next';
import css from './login.module.css';
import AuthFooter from '@/components/AuthFooter/AuthFooter';
import LoginForm from '@/components/AuthLogin/LoginForm'
import AuthHeader from '@/components/AuthHeader/AuthHeader';

export const metadata: Metadata = {
  title: 'Логін | Природні Мандри',
  description: 'Вхід в обліковий запис в Природних Мандрах',
};

const SignIn = () => {
  return (
    <div className={css.pageWrapper}>
        <AuthHeader/>
      <main className={css.mainContent}>
        <LoginForm />
      </main>
      <AuthFooter />
    </div>
  );
};

export default SignIn;