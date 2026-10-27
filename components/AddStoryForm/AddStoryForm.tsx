
import styles from "./AddStoryForm.module.css";
import Image from "next/image";

export default function AddStoryForm() {
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
                <select id="story-category" name="category" required className={styles.categorySelect}>
                    <option className={styles.categoryDefault} value="" disabled selected hidden>Категорія</option>
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                    <option value="option3">option3</option>
                </select>

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