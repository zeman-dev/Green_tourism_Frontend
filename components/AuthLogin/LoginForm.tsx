'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';

import styles from './LoginForm.module.css';
import { loginUser } from '@/lib/api/clientApi';

const loginSchema = Yup.object({
  name: Yup.string()
    .max(64, 'Імʼя та прізвище не може містити більше 64 символів')
    .matches(
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’ -]+$/,
      'Імʼя та прізвище не повинно містити спеціальних символів',
    )
    .required('Введіть імʼя та прізвище'),

  email: Yup.string()
    .email('Введіть коректну електронну адресу')
    .required('Введіть електронну адресу'),

  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .max(128, 'Пароль не може містити більше 128 символів')
    .required('Введіть пароль'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

type LoginFormValues = typeof initialValues;

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      setServerError('');

      await loginUser(values);

      router.push('/');
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      setServerError(
        axiosError.response?.data?.message || 'Не вдалося зареєструватися',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form} noValidate>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Пошта*
            </label>

            <Field
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="hello@podorozhnyky.ua"
              className={`${styles.input} ${
                touched.email && errors.email ? styles.inputError : ''
              }`}
            />

            <ErrorMessage
              name="email"
              component="p"
              className={styles.error}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Пароль*
            </label>

            <Field
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="********"
              className={`${styles.input} ${
                touched.password && errors.password ? styles.inputError : ''
              }`}
            />

            <ErrorMessage
              name="password"
              component="p"
              className={styles.error}
            />
          </div>

          {serverError && <p className={styles.error}>{serverError}</p>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вхід...' : 'Увійти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}