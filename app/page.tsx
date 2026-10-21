import styles from "./page.module.css";
import OurTravellers, { PrefetchTravellers } from "@/components/OurTravellers/OurTravellers";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PrefetchTravellers />
        <OurTravellers />
      </main>
    </div>
  );
}
