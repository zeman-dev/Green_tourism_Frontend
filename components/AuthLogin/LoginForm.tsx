'use client';

import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './LoginForm.module.css';
import { loginUser } from '@/lib/api/clientApi';
import {
  AuthTabs,
  RegisterLink,
  LoginLink,
} from '@/components/AuthTabLinks/AuthTabLinks';

interface LoginFormValues {
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

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      await loginUser(values);
      router.push('/profile');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Помилка авторизації. Спробуйте ще раз.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
            <AuthTabs>
              <RegisterLink />
              <LoginLink />
            </AuthTabs>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <h1 className={css.title}>Вхід</h1>
            <p className={css.subtitle}>Вітаємо знову у спільноті мандрівників!</p>

            <div className={css.inputGroup}>
              <label htmlFor='email' className={css.label}>Пошта*</label>
              <Field type="email" name="email" id="email" required placeholder='hello@podorozhnyky.ua' className={css.input} />
              <ErrorMessage name="email" component="span" className={css.errorText} />
            </div>

            <div className={css.inputGroup}>
              <label htmlFor='password' className={css.label}>Пароль*</label>
              <Field type="password" name="password" id="password" required placeholder='very_secret_password' className={css.input} />
              <ErrorMessage name="password" component="span" className={css.errorText} />
            </div>
            
            <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Зачекайте...' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}