import Layout from '../layout/layout';
import styles from '../styles/Home.module.css'; 

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Bem-vindo ao Sorvete!</h1>
        <p className={styles.description}>
          Este é o site oficial do melhor sorvete da cidade.
        </p>
      </div>
    </Layout>
  );
}
