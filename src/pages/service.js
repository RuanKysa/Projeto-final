import React, { useState, useEffect } from "react";
import Layout from "@/layout/layout";
import Benefits from "@/components/Benefits";
import Email from '@/components/email';
import { db } from "@/firebaseConnection";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import styles from "@/styles/Service.module.css";
import UploadImage from "@/components/UploadImage";

export default function Service() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [message, setMessage] = useState(""); // Estado para mensagem de feedback

    // Fetch dos produtos do Firebase Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productList);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    // Função para adicionar produto ao carrinho
    const addToCart = async (product) => {
        try {
            const response = await fetch('http://localhost:8080/adicionar', {  // Altere para sua rota correta de API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: product.id }),  // Enviando apenas o ID do produto
            });
    
            const result = await response.json();
            setMessage(result.message); // Define a mensagem de sucesso
            setTimeout(() => setMessage(""), 3000); // Limpa a mensagem após 3 segundos
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);
        }
    };

    // Função para abrir o modal com detalhes do produto
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Fechar modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Alternar visibilidade do formulário de upload
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    // Função para deletar produto do Firebase Firestore
    const deleteProduct = async (id) => {
        const confirmDelete = confirm("Tem certeza que deseja deletar este produto?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "products", id));
                alert("Produto deletado com sucesso!");
                // Atualiza a lista de produtos
                setProducts(products.filter((product) => product.id !== id));
            } catch (error) {
                console.error("Erro ao deletar o produto: ", error);
            }
        }
    };

    return (
        <Layout>
            <section className={styles.cor}>
                <button className={styles.iconButton} onClick={toggleFormVisibility}>
                    <i className="fa fa-plus"></i>
                </button>
                {isFormVisible && (
                    <div className={styles.formSection}>
                        <UploadImage />
                    </div>
                )}
            </section>
            <div className={styles.container}>
                <h2 className={styles.title}>Produto principal</h2>
                
                {/* Exibe a mensagem de feedback */}
                {message && <div className={styles.message}>{message}</div>}

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
                                    <button className={styles.iconButton} onClick={() => addToCart(product)}>
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
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        <i className="fa fa-trash"></i>
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
            <Benefits />
            <Email />

            {isModalOpen && selectedProduct && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                        <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.modalImage} />
                        <h2>{selectedProduct.name}</h2>
                        <p>${selectedProduct.price.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </Layout>
    );
}
