'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  updateAvatar,
  updateCurrentUser,
  type UpdateUserPayload,
} from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { getErrorMessage } from '@/lib/utils';
import css from './EditProfileForm.module.css';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Імʼя має містити щонайменше 2 символи')
    .max(32, 'Імʼя не може містити більше 32 символів')
    .required('Введіть імʼя'),
  email: Yup.string()
    .trim()
    .email('Введіть коректну електронну адресу')
    .max(64, 'Пошта не може містити більше 64 символів'),
  avatar: Yup.mixed<File>()
    .nullable()
    .test(
      'fileSize',
      'Фото має бути не більше 2 МБ',
      file => !file || file.size <= MAX_AVATAR_SIZE
    ),
});

interface EditProfileValues {
  name: string;
  email: string;
  avatar: File | null;
}

export default function EditProfileForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  const [preview, setPreview] = useState('');

  if (!user) {
    return <p className={css.status}>Завантаження профілю...</p>;
  }

  const handleSubmit = async (values: EditProfileValues) => {
    try {
      if (values.avatar) {
        await updateAvatar(values.avatar);
      }

      const name = values.name.trim();
      const email = values.email.trim();
      const payload: UpdateUserPayload = {};

      if (name !== user.name) payload.name = name;
      if (email) payload.email = email;

      let emailVerificationSent = false;

      if (payload.name || payload.email) {
        const response = await updateCurrentUser(payload);
        emailVerificationSent = response.emailVerificationSent;
      }

      if (emailVerificationSent) {
        toast.success(
          'Ми надіслали лист на вашу поточну пошту. Підтвердіть зміну email за посиланням у ньому.',
          { duration: 6000 }
        );
      } else {
        toast.success('Профіль оновлено');
      }

      router.push('/profile/saved');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Не вдалося оновити профіль'));
    } finally {
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  };

  return (
    <Formik<EditProfileValues>
      initialValues={{ name: user.name, email: '', avatar: null }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, errors, touched, setFieldValue }) => (
        <Form className={css.form} noValidate>
          <div className={css.avatarGroup}>
            <Image
              src={preview || user.avatarUrl}
              alt="Аватар"
              width={120}
              height={120}
              className={css.avatar}
            />

            <label className={css.fileButton}>
              Змінити фото
              <input
                type="file"
                accept="image/*"
                className={css.fileInput}
                onChange={event => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  setFieldValue('avatar', file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>

            {errors.avatar && <p className={css.error}>{errors.avatar}</p>}
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="name" className={css.label}>
              Імʼя
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className={`${css.input} ${
                touched.name && errors.name ? css.inputError : ''
              }`}
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="email" className={css.label}>
              Новий email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Залиште порожнім, якщо не змінюєте"
              className={`${css.input} ${
                touched.email && errors.email ? css.inputError : ''
              }`}
            />
            <ErrorMessage name="email" component="p" className={css.error} />
            <p className={css.hint}>
              Лист для підтвердження прийде на вашу поточну пошту.
            </p>
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!dirty || isSubmitting}
            >
              {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
            </button>
            <Link href="/profile/saved" className={css.cancelButton}>
              Скасувати
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
