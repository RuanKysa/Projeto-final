// components/Header.js

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '@/firebaseConnection';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import styles from '../styles/Header.module.css';

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // limpa o listener quando o componente é desmontado
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logout bem-sucedido!");
        } catch (err) {
            console.error("Erro ao deslogar:", err);
        }
    };

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
                    <li className={styles.separator}>|</li>
                    {user ? (
                        <>
                            <li className={styles.navItem}>
                                <img 
                                    src={user.photoURL || '/default-avatar.png'} 
                                    alt="User Avatar" 
                                    className={styles.userAvatar} 
                                />
                            </li>
                            <li className={styles.navItem}>
                                <span className={styles.userEmail}>{user.email}</span>
                            </li>
                            <li className={styles.navItem}>
                                <button onClick={handleLogout} className={styles.logoutButton}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className={styles.navItem}>
                            <Link href="/login" className={styles.navLink}>Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
