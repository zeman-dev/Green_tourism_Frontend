'use client';

import css from './login.module.css'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Copyright from '@/components/Copyright/Copyright';
import Logo from '@/components/Logo/Logo';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import { loginUser } from '@/lib/api/clientApi';


interface LoginFormValues{
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Невірний формат пошти').required("Електронна пошта є обов'язковою"),
    password: Yup.string().min(8, 'Пароль повинен містити мінімум 8 знаків').required("Пароль є обов'язковим"),
});

const SignIn = () => {
    const router = useRouter();

    const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const user = await loginUser(values);
      router.push('/profile');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Помилка авторизації. Спробуйте ще раз.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.pageWrapper}>
    <header className={css.header}>
        <Logo />
      </header>
      <main className={css.mainContent}>
        <div className={css.formContainer}>
    <AuthNavigation/>
     <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
      <h1 className={css.title}>Вхід</h1>
      <p className={css.subtitle}>Вітаємо знову у спільноті мандрівників!</p>

      <div className={css.inputGroup}>
      <label htmlFor='email' className={css.label}>
        Пошта*
        </label>
      <Field type="email" name="email" id="email" required placeholder='hello@podorozhnyky.ua' className={css.input}/>
      <ErrorMessage name="email" component="span" className={css.errorText}/>
      </div>

      <div className={css.inputGroup}>
      <label htmlFor='password' className={css.label}>
        Пароль*
      </label>
      <Field type="password" name="password" id="password" required placeholder='********' className={css.input}/>
      <ErrorMessage name="password" component="span" className={css.errorText}/>
      </div>
      
      <button type="submit" className={css.submitBtn}>Увійти</button>
    </Form>
    </Formik>
    </div>
      </main>
    <footer className={css.footer}>
        <Copyright serverYear={new Date().getFullYear()} />
      </footer>
   </div>
  );
};

export default SignIn;