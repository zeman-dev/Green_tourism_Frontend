import styles from "./TravellerInfo.module.css";
import Image from 'next/image';
import Link from "next/link";
import type { User } from "../../types/user";

interface TravellerInfoProps {
    user: User;
}

export default function TravellerCard({ user }: TravellerInfoProps) {
    return (
        <>
            <div className={styles.cardWrapper}>
                <div className={`${styles.card} container`}>
                    <Image className={styles.cardImage} src={user.avatarUrl} alt={user.name} width={145} height={145} />
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{user.name}</h3>
                        <p className={styles.articlesInfo}>Статей: {user.articlesAmount}</p>
                    </div>
                </div>
            </div>
        </>
    )
}