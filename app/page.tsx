import styles from "./page.module.css";
import { Suspense } from "react";
import PopularStories from "@/components/PopularStories/PopularStories";




export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<p className={styles.loader}>Завантаження...</p>}>
          <PopularStories />
        </Suspense>

      </main>
    </div>
  );
}
