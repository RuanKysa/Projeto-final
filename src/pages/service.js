import Layout from "@/layout/layout";
import styles from "@/styles/Service.module.css";

export default function Service() {
  return (
    <Layout>
      <div className={styles.serviceContainer}>
        {/* Seção de lista de produtos/serviços */}
        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Produtos e Serviços</h2>
          <ul className={styles.productList}>
            <li className={styles.productItem}>Picolés (diversos sabores)</li>
            <li className={styles.productItem}>Balde de Sorvete (opções de 1L, 2L, 5L)</li>
            <li className={styles.productItem}>Personalização de sabores e coberturas</li>
          </ul>
        </section>

        {/* Seção de pacotes ou ofertas especiais */}
        <section className={styles.offersSection}>
          <h2 className={styles.sectionTitle}>Ofertas Especiais</h2>
          <div className={styles.offer}>
            <h3 className={styles.offerTitle}>Pacote para Festas</h3>
            <p>Compre 100 picolés e ganhe 10% de desconto no próximo pedido.</p>
          </div>
          <div className={styles.offer}>
            <h3 className={styles.offerTitle}>Combo Sorvete + Picolés</h3>
            <p>Leve 2 baldes de sorvete de 5L e receba 50 picolés grátis.</p>
          </div>
        </section>

        {/* Seção do processo de compra */}
        <section className={styles.purchaseProcessSection}>
          <h2 className={styles.sectionTitle}>Como Fazer um Pedido</h2>
          <ol className={styles.purchaseSteps}>
            <li className={styles.purchaseStep}>Escolha seus produtos e adicione ao carrinho.</li>
            <li className={styles.purchaseStep}>Personalize sabores e coberturas, se necessário.</li>
            <li className={styles.purchaseStep}>Selecione a quantidade (mínimo de 100 picolés ou 10 baldes).</li>
            <li className={styles.purchaseStep}>Finalize a compra e escolha entre entrega ou retirada.</li>
            <li className={styles.purchaseStep}>Realize o pagamento online ou opte por pagamento na entrega.</li>
          </ol>
        </section>
      </div>
    </Layout>
  );
}
