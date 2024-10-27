import { useState, useEffect } from 'react';
import styles from '../styles/Carrinho.module.css';

export default function Carrinho({ isOpen, toggleCartModal }) {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchCart();
        }
    }, [isOpen]);

    // Função para buscar os itens do carrinho na API
    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:8080/carrinho', {
                credentials: 'include'
            });
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
        }
    };

    // Função para remover um item do carrinho
    const removeFromCart = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8080/remover/${itemId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setMessage('Item removido com sucesso!');
                fetchCart(); // Atualiza o carrinho
                setTimeout(() => setMessage(''), 3000); // Limpa a mensagem após 3 segundos
            } else {
                console.error('Erro ao remover item do carrinho');
            }
        } catch (error) {
            console.error('Erro ao remover item:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.cartModalOverlay}>
            <div className={styles.cartModal}>
                <button className={styles.closeButton} onClick={toggleCartModal}>
                    &times;
                </button>
                <h2>Meu Carrinho</h2>

                {/* Mensagem de feedback */}
                {message && <p className={styles.message}>{message}</p>}

                {cartItems.length > 0 ? (
                    <ul className={styles.cartItems}>
                        {cartItems.map((item, index) => (
                            <li key={index} className={styles.cartItem}>
                                <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>Preço: ${item.price.toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>O carrinho está vazio.</p>
                )}
            </div>
        </div>
    );
}
