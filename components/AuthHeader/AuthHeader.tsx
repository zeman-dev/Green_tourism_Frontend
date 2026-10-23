import Image from 'next/image';
import Link from 'next/link';

import styles from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="На головну сторінку">
        <Image
          src="/company-logo.svg"
          alt="Природні Мандри"
          width={165}
          height={48}
          priority
        />
      </Link>
    </header>
  );
}