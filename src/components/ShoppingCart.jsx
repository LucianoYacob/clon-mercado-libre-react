import { useContext } from "react"
import { CartContext } from "../contexts/ShoppingCartContext"

export default function ShoppingCart() {
    const [cart, setCart] = useContext(CartContext);

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


    return (
        <section>
            <div>Items en carro : {quantity}</div>
            <div>Total: ${totalCost}</div>
            <button onClick={() => console.log(cart)}>Checkout</button>
        </section>
    )
};
