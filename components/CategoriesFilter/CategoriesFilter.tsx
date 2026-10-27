'use client';

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api/clientApi';
import type { Category } from '@/types/category';
import styles from './CategoriesFilter.module.css';
import ArrowIcon from './ArrowIcon';

interface CategoriesFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoriesFilter = ({
  selectedCategory,
  onCategoryChange,
}: CategoriesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: categories = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24,
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

  return (
    <div className={styles.filter}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${
            selectedCategory === 'all' ? styles.active : ''
          }`}
          onClick={() => onCategoryChange('all')}
        >
          Всі статті
        </button>

        {categories.map(({ _id, category }: Category) => (
          <button
            key={_id}
            type="button"
            className={`${styles.button} ${
              selectedCategory === category ? styles.active : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.selectWrapper}>
        <p className={styles.label}>Категорії</p>

        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.select} ${isOpen ? styles.selectOpen : ''}`}
            onClick={() => setIsOpen(prev => !prev)}
            aria-expanded={isOpen}
          >
            <span>
              {selectedCategory === 'all' ? 'Всі статті' : selectedCategory}
            </span>

            <ArrowIcon isOpen={isOpen} />
          </button>

          {isOpen && (
            <ul className={styles.options}>
              <li>
                <button
                  type="button"
                  className={`${styles.option} ${
                    selectedCategory === 'all' ? styles.selectedOption : ''
                  }`}
                  onClick={() => {
                    onCategoryChange('all');
                    setIsOpen(false);
                  }}
                >
                  Всі статті
                </button>
              </li>

              {categories.map(({ _id, category }: Category) => (
                <li key={_id}>
                  <button
                    type="button"
                    className={`${styles.option} ${
                      selectedCategory === category ? styles.selectedOption : ''
                    }`}
                    onClick={() => {
                      onCategoryChange(category);
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
      </div>

      {isLoading && <p className={styles.status}>Завантаження категорій...</p>}

      {isFetching && !isLoading && (
        <p className={styles.status}>Оновлення даних...</p>
      )}

      {error && (
        <p className={styles.error}>Не вдалося завантажити категорії.</p>
      )}
    </div>
  );
};

export default CategoriesFilter;
