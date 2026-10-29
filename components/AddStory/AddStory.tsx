import styles from "./AddStory.module.css";
import AddStoryForm from "../AddStoryForm/AddStoryForm";

export default function AddStory() {
    return (
        <>
            <section className={styles.section}>
                <div className="container">
                    <h1 className={styles.title}>Створити нову історію</h1>
                    <AddStoryForm/>
                </div>
            </section>
        </>
    )
}