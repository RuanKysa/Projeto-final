import Layout from '../layout/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Sorvetes Q-Delícia</h1>
        <p className={styles.description}>
          Este é o site oficial do melhor sorvete da cidade e Região.
        </p>
      </div>
      <h2 className={styles.title2}>Nossos Sorvetes</h2>
      
      <section className={styles.tam}>
        <div className={styles.centro}>
          <div className={styles.grid}>
            <a href="#" className={styles.card}>
              <img src="/p4375.png" alt="Sorvete" className={styles.cardImage} />
              <h3 className={styles.cardTitle}>Sorvete de Morango</h3>
              <p className={styles.cardDescription}>
                Sorvete de morango, feito com amor e cuidado, com a melhor qualidade</p>
              <img />
            </a>
            <a href="#" className={styles.card}>
              <img src="/p4375.png" alt="Sorvete" className={styles.cardImage} />
              <h3 className={styles.cardTitle}>Sorvete de Morango</h3>
              <p className={styles.cardDescription}>
                Sorvete de morango, feito com amor e cuidado, com a melhor qualidade</p>
              <img />
            </a>
            <a href="#" className={styles.card}>
              <img src="/p4375.png" alt="Sorvete" className={styles.cardImage} />
              <h3 className={styles.cardTitle}>Sorvete de Morango</h3>
              <p className={styles.cardDescription}>
                Sorvete de morango, feito com amor e cuidado, com a melhor qualidade</p>
              <img />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
