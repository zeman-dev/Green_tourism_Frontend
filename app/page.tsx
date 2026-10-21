import styles from "./page.module.css";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <OurTravellers /> */}
        <TravellerInfo user={{
          _id: "6881563901add19ee16fd01a",
          name: "Матвій Петренко",
          avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd01a.webp",
          articlesAmount: 12,
        }}/>
      </main>
    </div>
  );
}
