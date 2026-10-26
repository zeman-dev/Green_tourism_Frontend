
import styles from "./AddStoryForm.module.css";
import Image from "next/image";

export default function AddStoryForm() {
    return (
        <>
            <form action="" className={styles.form}>
                <label htmlFor="title">Обкладинка статті</label>
                <div className={styles.imageWrapper}>
                    <Image 
                        className={styles.image}
                        src='/images/story-placeholder.png'
                        alt="Обкладинка статті" 
                        fill
                    />
                </div>

                <label className={styles.imageButton}>
                    Завантажити фото
                    <input type="file" accept="image/*" style={{ display: 'none' }} />
                </label>

                <label className={styles.title}>Заголовок</label>
                <input className={styles.titleInput} type="text" placeholder="Введіть заголовок історії" />

                <label className={styles.category}>Категорія</label>
                <select className={styles.categorySelect}>
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                    <option value="option3">option3</option>
                </select>

                <label className={styles.story}>Текст історії</label>
                <textarea className={styles.storyTextarea} placeholder="Ваша історія тут" rows={5} />

                <div className={styles.buttonWrapper}>
                    <button className={styles.submitButton} type="submit">Зберегти</button>
                    <button className={styles.cancelButton} type="button">Відмінити</button>
                </div>
            </form>
        </>
    )
}