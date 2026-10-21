'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { registerUser } from '../../lib/api/api';
import styles from './RegistrationForm.module.css';

const registrationSchema = Yup.object({
  name: Yup.string().required("Введіть ім'я та прізвище"),

  email: Yup.string()
    .email('Введіть коректну електронну адресу')
    .required('Введіть електронну адресу'),

  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .required('Введіть пароль'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function RegistrationForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setServerError('');

          await registerUser(values);

          router.push('/');
        } catch (error) {
          const axiosError = error as AxiosError<{ message?: string }>;

          setServerError(
            axiosError.response?.data?.message || 'Не вдалося зареєструватися',
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>
              Імʼя та Прізвище*
            </label>

            <Field
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ваше імʼя та прізвище"
              className={`${styles.input} ${
                touched.name && errors.name ? styles.inputError : ''
              }`}
            />

            <ErrorMessage
              name="name"
              component="p"
              className={styles.error}
            />
          </div>

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
            {isSubmitting ? 'Реєстрація...' : 'Зареєструватись'}
          </button>
        </Form>
      )}
    </Formik>
  );
}