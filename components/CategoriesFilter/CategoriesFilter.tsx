'use client';

import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api/api';
import styles from './CategoriesFilter.module.css';
import ArrowIcon from './ArrowIcon';

interface Category {
  _id: string;
  category: string;
}

interface CategoriesFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoriesFilter = ({
  selectedCategory,
  onCategoryChange,
}: CategoriesFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get<Category[]>('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Не вдалося завантажити категорії.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category: string) => {
    if (category !== selectedCategory) {
      onCategoryChange(category);
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Завантаження категорій...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.filter}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${
            selectedCategory === 'all' ? styles.active : ''
          }`}
          onClick={() => handleCategoryChange('all')}
        >
          Всі статті
        </button>

        {categories.map(({ _id, category }) => (
          <button
            key={_id}
            type="button"
            className={`${styles.button} ${
              selectedCategory === category ? styles.active : ''
            }`}
            onClick={() => handleCategoryChange(category)}
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
            aria-haspopup="listbox"
          >
            <span>
              {selectedCategory === 'all' ? 'Всі статті' : selectedCategory}
            </span>

            <ArrowIcon isOpen={isOpen} />
          </button>

          {isOpen && (
            <ul className={styles.options} role="listbox">
              <li>
                <button
                  type="button"
                  className={`${styles.option} ${
                    selectedCategory === 'all' ? styles.selectedOption : ''
                  }`}
                  onClick={() => {
                    handleCategoryChange('all');
                    setIsOpen(false);
                  }}
                >
                  Всі статті
                </button>
              </li>

              {categories.map(({ _id, category }) => (
                <li key={_id}>
                  <button
                    type="button"
                    className={`${styles.option} ${
                      selectedCategory === category ? styles.selectedOption : ''
                    }`}
                    onClick={() => {
                      handleCategoryChange(category);
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
    </div>
  );
};

export default CategoriesFilter;
