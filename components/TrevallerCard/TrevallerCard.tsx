import styles from "./TrevallerCard.module.css";
import Image from 'next/image';
import Link from "next/link";

export default function TravellerCard() {
    return (
        <>
            <div className={styles.card}>
                <Image className={styles.cardImage} src="https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd014.webp" alt="Picture of the author" width={130} height={130} />
                <h3 className={styles.cardTitle}>Андрій Коваленко</h3>
                <p className={styles.articlesInfo}>Статей: 3</p>
                <Link className={styles.cardButton} href="/"> Переглянути профіль</Link>
            </div>
        </>
    )
}