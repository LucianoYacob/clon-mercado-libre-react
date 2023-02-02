import { ProductCard } from "./ProductCard";
import styles from "../styles/ProductList.module.css";

export function ProductsList({ products, title, children }) {

    return (
        <ul className={styles.list}>
            {products.map(el => <ProductCard id={el.id} imgURL={el.images[0]} name={el.title} price={el.price} description={el.description} key={el.id} discountPrice={true}/>)}
        </ul>
    )
};
