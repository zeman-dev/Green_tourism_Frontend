import styles from "./OurTravellers.module.css";
import Link from "next/link";

export default function OurTravellers() {
    return (
        <>
            <section className={styles.section}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Наші Мандрівники</h2>
                    <Link className={styles.sectionButton} href="/travellers">Всі мандрівники</Link>
                </div>
            </section>
        </>
    )
}