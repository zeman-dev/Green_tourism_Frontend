import styles from "./TrevallerCard.module.css";
import Image from 'next/image';
import Link from "next/link";

export default function TravellerCard({ user }) {
    return (
        <>
            <div className={styles.card}>
                <Image className={styles.cardImage} src={user.avatarUrl} alt="Picture of the author" width={130} height={130} />
                <h3 className={styles.cardTitle}>{user.name}</h3>
                <p className={styles.articlesInfo}>{user.articlesAmount}</p>
                <Link className={styles.cardButton} href="/"> Переглянути профіль</Link>
            </div>
        </>
    )
}