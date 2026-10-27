'use client'

import { useEffect, useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import styles from "./AddStoryForm.module.css";
import Image from "next/image";
import { fetchCategories } from '@/lib/api/clientApi';
import type { Category } from '@/types/category';

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
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 60 * 24,
    });
    const selectedOption = categories.find(({ category }: Category) => category === selectedCategory);

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
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <form action="" className={styles.form}>
                <label htmlFor="story-cover" className={styles.title}>Обкладинка статті</label>
                <div className={styles.imageWrapper}>
                    <Image 
                        className={styles.image}
                        src='/images/story-placeholder.png'
                        alt="Обкладинка статті" 
                        fill
                    />
                </div>

                <label htmlFor="story-image" className={styles.imageButton}>
                    Завантажити фото
                    <input id="story-image" name="storyImage" type="file" accept="image/*" style={{ display: 'none' }} />
                </label>

                <label htmlFor="story-title" className={styles.title}>Заголовок</label>
                <textarea id="story-title" name="title" className={styles.input} placeholder="Введіть заголовок історії" />

                <label htmlFor="story-category" className={styles.title}>Категорія</label>
                <div className={styles.dropdown} ref={dropdownRef}>
                    <input type="hidden" name="category" value={selectedCategory} />
                    <button
                        id="story-category"
                        type="button"
                        className={`${styles.select} ${isOpen ? styles.selectOpen : ""}`}
                        onClick={() => setIsOpen(prev => !prev)}
                        aria-expanded={isOpen}
                    >
                        <span className={!selectedCategory ? styles.placeholder : ""}>
                            {selectedOption ? selectedOption.category : "Категорія"}
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
                                            setSelectedCategory(category);
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

                <label htmlFor="story-text" className={styles.title}>Текст історії</label>
                <textarea id="story-text" name="storyText" className={styles.textarea} placeholder="Ваша історія тут" />

                <div className={styles.buttonWrapper}>
                    <button className={styles.cancelButton} type="submit">Відмінити</button>
                    <button className={styles.submitButton} type="button">Зберегти</button>
                </div>
            </form>
        </>
    )
}