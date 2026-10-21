import styles from "./page.module.css";
import Hero from '@/components/Hero/Hero';
import OurTravellers, { PrefetchTravellers } from "@/components/OurTravellers/OurTravellers";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <PrefetchTravellers />
        <OurTravellers />
      </main>
    </div>
  );
}
