'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { registerUser } from '../../lib/api/authApi';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './RegistrationForm.module.css';

const registrationSchema = Yup.object({
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

type RegistrationFormValues = typeof initialValues;

export default function RegistrationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    values: RegistrationFormValues,
    { setSubmitting }: FormikHelpers<RegistrationFormValues>,
  ) => {
    try {
      const user = await registerUser(values);
      setUser(user);
      queryClient.setQueryData(['currentUser'], user);

      router.push('/');
    } catch (error: unknown) {
      let errorMessage = 'Помилка реєстрації. Спробуйте ще раз.';

      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          errorMessage =
            'Користувач з такою електронною поштою вже існує.';
        } else if (error.response?.status === 400) {
          errorMessage = 'Перевірте правильність введених даних.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationSchema}
      onSubmit={handleSubmit}
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