import Layout from "@/layout/layout";
import Benefits from "@/components/Benefits"; // Importando o componente de benefícios
import styles from "@/styles/Service.module.css";

const products = [
    { id: 1, name: "Mint Chocolate Chip", price: 20.00, image: "/1.jpg" },
    { id: 2, name: "Caramel Ice Cream", price: 241.00, image: "/2.jpg" },
    { id: 3, name: "Raspberry", price: 745.00, image: "/3.jpg" },
    { id: 4, name: "Mango Dolly", price: 454.00, image: "/4.jpg" },
    { id: 5, name: "Cotton Candy", price: 412.00, image: "/5.jpg" },
    { id: 6, name: "Waffle Ice Cream", price: 122.00, image: "/6.jpg" },
    { id: 7, name: "Ice Cream Cone", price: 241.00, image: "/7.jpg" },
    { id: 8, name: "Chocolate Vanilla Ice Cream", price: 893.00, image: "/8.jpg" },
    { id: 9, name: "Mix Ice Cream", price: 873.00, image: "/9.jpg" },
    { id: 10, name: "Cherry", price: 854.00, image: "/10.jpg" }
];

export default function Service() {
    return (
        <Layout>
            <Benefits />
            
            <div className={styles.container}>
                <h2 className={styles.title}>Produto principal</h2>
                <div className={styles.buttonGroup}>
                    <button className={styles.button}>MAIS RECENTE</button>
                    <button className={styles.button}>ESPECIAL</button>
                </div>
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                                <div className={styles.iconOverlay}>
                                    <button className={styles.iconButton}>
                                        <i className="fa fa-shopping-bag"></i>
                                    </button>
                                    <button className={styles.iconButton}>
                                        <i className="fa fa-heart"></i>
                                    </button>
                                    <button className={styles.iconButton}>
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    <button className={styles.iconButton}>
                                        <i className="fa fa-random"></i>
                                    </button>
                                </div>
                            </div>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                            <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
