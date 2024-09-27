

import Link from 'next/link';
import styles from '../styles/Header.module.css'

export default function Header() {
    return (
        <header>
            <nav className={styles.container}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                    </li>
                    <li className={styles.separator}>|</li>
                    <li className={styles.navItem}>
                        <Link href="/about" className={styles.navLink}>About</Link>
                    </li>
                    <li className={styles.separator}>|</li>
                    <li className={styles.navItem}>
                        <Link href="/service" className={styles.navLink}>Service</Link>
                    </li>
                    <li className={styles.separator}>|</li>
                    <li className={styles.navItem}>
                        <Link href="/contact" className={styles.navLink}>Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

