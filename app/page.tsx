
import styles from './page.module.css';
import About from '@/components/About/About';
import PopularStories from '@/components/PopularStories/PopularStories';
import Hero from '@/components/Hero/Hero';
import Community from '@/components/Community/Community';
import OurTravellers from '@/components/OurTravellers/OurTravellers';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Community isAuthenticated={false} />
        <PopularStories />
        <About />
        <OurTravellers />
      </main>
      <Footer />
    </div>
  );
}
