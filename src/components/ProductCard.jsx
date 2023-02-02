import { Link } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

export function ProductCard(
    {
        id,
        imgURL,
        name,
        price = 0.00,
        description,
        widthHeight = 224,
        hoverAction = true,
        discountPrice = false
    }
) {
    const generateRandomNumber = max => Math.ceil(Math.random() * max + 1);  
    
    const trunc = num => Math.round((num + Number.EPSILON) * 100) / 100
    
    const discount = generateRandomNumber(51);
    const priceDiscount = price - ((discount / 100) * price);

    const productItemClass = hoverAction ? styles.productItemH : styles.productItemNotH;

    return (
        <li className={ productItemClass } style={{width:widthHeight}}>
            <Link to={`/products/${id}`} style={{width:widthHeight}}>
                <div className={styles.productImg}>
                    <img width={widthHeight} height={224} src={imgURL} alt="producto" />
                    {/* Añadir un logo */}
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productPriceAndDiscount}>
                        <strike className={ styles.price }>${price}</strike>
                        { discountPrice ?
                            <>
                            <strong>${trunc(priceDiscount)}</strong>
                            <span>{discount}% OFF</span>
                            </>
                            :
                            <strong>${price}</strong>
                        }
                    </div>
                    <p>Mismo precio en 6 cuotas de $23.333</p>
                    <strong>Envío gratis</strong>
                    <p className={styles.productInfoLegend}>{description}</p>  
                </div>
            </Link>
        </li>
    )
};
