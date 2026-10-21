import Link from 'next/link';
import { getPopularStories } from '@/lib/api/popularStories';
import PopularStoriesSlider from './PopularStoriesSlider';
import styles from './PopularStories.module.css';

export default async function PopularStories() {
    let stories = [];

    try {
        stories = await getPopularStories();
    } catch {
        return(
            <section className={styles.section}>
                <p>Не вдалось завантажити популярні статті.</p>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Популярні статті</h2>
                <Link className={styles.allStories} href="/stories">
                Всі статті
                </Link>   
            </div>

            <PopularStoriesSlider stories={stories}/>
        </section>
    );
    
}