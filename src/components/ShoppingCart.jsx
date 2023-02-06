import { useContext, useRef } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";
import styles from "../styles/ShoppingCart.module.css";

export default function ShoppingCart() {
    const [cart, setCart] = useContext(CartContext);
    const inputQuantity = useRef(null);

    // const getQuantityById = ("algun id") => {
    //     return cart.find(item => item.id == "algun id")?.quantity || 0;
    // }

    const quantity = cart.reduce((acc, el) => {
        return acc + el.quantity;
    }, 0);

    const totalCost = cart.reduce((acc, el) => {
        return acc + el.quantity * el.price;
        // El acc (acumulador) es 0 en un principio
    }, 0);


    const handleSubClick = (item) => {
        setCart((currentItems) => {
            return currentItems.map(el => {
                if(el.id === item.id){
                    if(el.quantity > 1)
                        return {...el, quantity: item.quantity - 1}
                    return {...el}
                }
                else{
                    return {...el};
                }
            })
        });
    }

    const handleAddClick = (item) => {
        setCart((currentItems) => {
            return currentItems.map(el => {
                if(el.id === item.id){
                    return {...el, quantity: item.quantity + 1}
                }
                else{
                    return {...el};
                }
            })
        });
    }

    const handleDeleteClick = (id) => {    
        setCart(prevState => {
            return prevState.filter(el => el.id !== id);
        });
    }

    return (
        <section className={styles.cartContainer}>
            <div className={styles.internalContainer}>
                <div>
                    <div className={styles.cartText}>
                        <span>Carrito ({quantity})</span>
                    </div>
                </div>
                <ul className={styles.listItems}>
                    {cart.map(el => 
                        <li className={styles.listItem} key={el.id}>
                            <div className={styles.firstDiv}>
                                <img className={styles.itemImage} src={el.image} alt={el.title} width={48} height={48} />
                                <h2 className={styles.itemTitle}>{el.title}</h2>
                            </div>
                            <div className={styles.secondDiv}>
                                <form className={styles.cartForm}>
                                    <button type="button" className={styles.btnSub} onClick={() => handleSubClick(el)}>-</button>
                                    <input ref={inputQuantity} type="number" maxLength="120" minLength="1" className={styles.itemQuantity} value={el.quantity} readOnly/>
                                    <button type="button" className={styles.btnAdd} onClick={() => handleAddClick(el)}>+</button>
                                </form>
                                <button className={styles.btnEliminar} onClick={() => handleDeleteClick(el.id)}>Eliminar</button>
                            </div>
                            <div className={styles.thirdDiv}>
                                <span className={styles.itemPrice}>${el.price * el.quantity}</span>
                            </div>
                        </li>
                    )}
                </ul>
                <div className={styles.totalAmount}>Total ${totalCost}</div>
                <div className={styles.btnContainer}>
                    <button className={styles.btnBuy} onClick={() => console.log(cart)}>Continuar Compra</button>
                </div>
            </div>
        </section>
    )
};
