'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { createStory, fetchCategories } from '@/lib/api/clientApi';
import type { Category } from '@/types/category';
import styles from './AddStoryForm.module.css';

type StoryFormValues = {
  img: File | null;
  title: string;
  article: string;
  category: string;
};

const initialValues: StoryFormValues = {
  img: null,
  title: '',
  article: '',
  category: '',
};

const validationSchema = Yup.object({
  img: Yup.mixed<File>()
    .nullable()
    .required('Обкладинка статті є обов’язковою')
    .test(
      'fileSize',
      'Розмір зображення не повинен перевищувати 1 МБ',
      value => !value || (value instanceof File && value.size <= 1024 * 1024),
    ),
  title: Yup.string()
    .trim()
    .min(2, 'Заголовок має містити мінімум 2 символи')
    .max(40, 'Заголовок не може містити більше 40 символів')
    .required('Введіть заголовок історії'),
  article: Yup.string()
    .trim()
    .min(12, 'Текст історії має містити мінімум 12 символів')
    .max(3000, 'Текст історії не може містити більше 3000 символів')
    .required('Введіть текст історії'),
  category: Yup.string()
    .required('Виберіть категорію')
    .matches(/^[a-fA-F0-9]{24}$/, 'Невірна категорія'),
});

function ArrowIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <img
      src="/icons/arrow.svg"
      alt=""
      aria-hidden="true"
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 200ms ease',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}

export default function AddStoryForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [serverError, setServerError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (
    values: StoryFormValues,
    { setSubmitting }: FormikHelpers<StoryFormValues>,
  ) => {
    setServerError('');

    try {
      if (!values.img) {
        setServerError('Обкладинка статті є обов’язковою');
        setSubmitting(false);
        return;
      }

      if (!values.category) {
        setServerError('Виберіть категорію');
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('img', values.img);
      formData.append('title', values.title.trim());
      formData.append('article', values.article.trim());
      formData.append('category', values.category);

      const response = await createStory(formData);
      const storyId = response._id ?? response.story?._id;

      if (!storyId) {
        setServerError('Не вдалося отримати ID створеної історії');
        return;
      }

      router.push(`/stories/${storyId}`);
    } catch (error) {
      const backendMessage =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data
              ?.message
          : '';

      setServerError(
        backendMessage || 'Не вдалося зберегти історію. Спробуйте ще раз.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, isValid, setFieldValue, setFieldError, resetForm }) => {
        const selectedOption = categories.find(
          ({ _id }: Category) => _id === values.category,
        );

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.currentTarget.files?.[0] ?? null;

          if (!file) {
            setFieldValue('img', null);
            setImagePreview(prev => {
              if (prev && prev.startsWith('blob:')) {
                URL.revokeObjectURL(prev);
              }
              return null;
            });
            return;
          }

          const isValidImage =
            file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024;

          if (!isValidImage) {
            setFieldValue('img', file);
            setImagePreview(prev => {
              if (prev && prev.startsWith('blob:')) {
                URL.revokeObjectURL(prev);
              }
              return null;
            });
            return;
          }

          setFieldValue('img', file);
          setFieldError('img', undefined);

          const nextPreview = URL.createObjectURL(file);
          setImagePreview(prev => {
            if (prev && prev.startsWith('blob:')) {
              URL.revokeObjectURL(prev);
            }
            return nextPreview;
          });
        };

        return (
          <Form className={styles.form} noValidate>
            <label htmlFor="story-cover" className={`${styles.title} ${styles.imageTitle}`}>
              Обкладинка статті
            </label>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.image}
                src={imagePreview || '/images/story-placeholder.png'}
                alt="Обкладинка статті"
                fill
              />
            </div>

            <div className={styles.imageFieldGroup}>
              <label htmlFor="story-image" className={styles.imageButton}>
                Завантажити фото
                <input
                  id="story-image"
                  name="img"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleFileChange}
                />
              </label>
              {touched.img && errors.img && (
                <p className={styles.error}>{errors.img}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="story-title" className={styles.title}>
                Заголовок
              </label>
              <Field
                id="story-title"
                name="title"
                as="textarea"
                className={`${styles.input} ${
                  touched.title && errors.title ? styles.inputError : ''
                }`}
                placeholder="Введіть заголовок історії"
              />
              <ErrorMessage name="title" component="p" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="story-category" className={styles.title}>
                Категорія
              </label>
              <div className={styles.dropdown} ref={dropdownRef}>
                <Field type="hidden" name="category" />
                <button
                  id="story-category"
                  type="button"
                  className={`${styles.select} ${isOpen ? styles.selectOpen : ''}`}
                  onClick={() => setIsOpen(prev => !prev)}
                  aria-expanded={isOpen}
                >
                  <span className={!values.category ? styles.placeholder : ''}>
                    {selectedOption ? selectedOption.category : 'Категорія'}
                  </span>
                  <ArrowIcon isOpen={isOpen} />
                </button>

                {isOpen && (
                  <ul className={styles.options}>
                    {categories.map(({ _id, category }: Category) => (
                      <li key={_id}>
                        <button
                          type="button"
                          className={styles.option}
                          onClick={() => {
                            setFieldValue('category', _id);
                            setIsOpen(false);
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <ErrorMessage name="category" component="p" className={styles.error} />
            </div>

            <div className={`${styles.fieldGroup} ${styles.textareaFieldGroup}`}>
              <label htmlFor="story-text" className={styles.title}>
                Текст історії
              </label>
              <Field
                id="story-text"
                name="article"
                as="textarea"
                className={`${styles.textarea} ${
                  touched.article && errors.article ? styles.inputError : ''
                }`}
                placeholder="Ваша історія тут"
              />
              <ErrorMessage name="article" component="p" className={styles.error} />
            </div>

            <div className={styles.buttonWrapper}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={() => {
                  resetForm();
                  setServerError('');
                  setIsOpen(false);
                  setImagePreview(prev => {
                    if (prev && prev.startsWith('blob:')) {
                      URL.revokeObjectURL(prev);
                    }
                    return null;
                  });
                }}
              >
                Відмінити
              </button>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
              </button>
            </div>

            <div className={styles.submitErrorWrapper}>
              {serverError && <p className={styles.error}>{serverError}</p>}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}