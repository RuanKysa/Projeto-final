import React, { useState, useEffect } from "react";
import Layout from "@/layout/layout";
import Benefits from "@/components/Benefits";
import Email from "@/components/email";
import styles from "@/styles/Service.module.css";
import axios from "axios"; 

export default function Service() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Função para buscar produtos do back-end
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/sorvetes'); 
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    // Função para deletar um produto
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/sorvetes/${id}`); 
            setProducts(products.filter(product => product._id !== id)); 
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    // Efeito para buscar produtos quando o componente é montado
    useEffect(() => {
        fetchProducts();
    }, []);

    // Função para abrir o modal
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <Layout>
            <section className={styles.cor}></section>
            <div className={styles.container}>
                <h2 className={styles.title}>Produto principal</h2>
                <div className={styles.productGrid}>
                    {products.map(product => (
                        <div key={product._id} className={styles.productCard}> 
                            <div className={styles.imageContainer}>
                                <img
                                    src={product.imagem} 
                                    alt={product.nome} 
                                    className={styles.productImage}
                                />
                                <div className={styles.iconOverlay}>
                                    <button className={styles.iconButton}>
                                        <i className="fa fa-shopping-bag"></i>
                                    </button>
                                    <button className={styles.iconButton}>
                                        <i className="fa fa-heart"></i>
                                    </button>
                                    <button
                                        className={styles.iconButton}
                                        onClick={() => openModal(product)}>
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    <button
                                        className={styles.iconButton}
                                        onClick={() => deleteProduct(product._id)}> 
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <h3 className={styles.productName}>{product.nome}</h3> 
                            <p className={styles.productPrice}>${product.preco.toFixed(2)}</p> 
                        </div>
                    ))}
                </div>
            </div>
            <Benefits />
            <Email />
        </Layout>
    );
}
