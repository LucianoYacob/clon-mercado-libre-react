import { useParams } from "react-router-dom";
import  get  from "../utilities/httpClient";
import styles from "../styles/ProductDetails.module.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function ProductDetails(params) {
    const { productId } = useParams();

    const $stockBox = useRef(null);
    const $stockBtn = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [stockBoxVisibility, setStockBoxVisibility] = useState(false);
    const [units, setUnits] = useState(1);
    const [firstImage, setFirstImage] = useState("");

    useEffect(() => {
        const listener = (e) => {
            if(e.target !== $stockBtn.current || stockBoxVisibility){
                if($stockBox.current !== null)
                    $stockBox.current.style.display = "none";
                setStockBoxVisibility(false);
            }
            else if(e.target === $stockBtn.current || !stockBoxVisibility){
                $stockBox.current.style.display = "block";
                setStockBoxVisibility(true);
            }
        }

        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("click", listener);
        };
    }, [stockBoxVisibility]);

    useEffect(() => {
        setIsLoading(true);

        get("products/"+productId).then(data => {
          setProduct(data);
          setIsLoading(false);
        });
        
    }, [productId]);

    if(isLoading) {
        return <div>Cargando</div>
    }


    const handlerStockClick = (e, num) => {
        const $elements = Array.from(document.getElementsByClassName(styles.activeLi));
        if($elements.length > 0){
            $elements.forEach((element) => {
                element.classList.remove(styles.activeLi);
            });
        }
        e.currentTarget.classList.add(styles.activeLi);
        setUnits(num);
    }

    const handleImageClick = (e, img) => {
        setFirstImage(img);
    } 

    return (
    <div className={styles.detailsContainer}>
        <div className={styles.internalContainer}>
            <div className={styles.flexContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.internalLeftContainer}>
                        <div className={styles.imgColumnContainer}>
                            <div className={styles.visorContainer}>
                                <ul>
                                    {product.images.map((el, i) => <li key={i} onClick={(e) => handleImageClick(e, el)}><img width={44} height={44} src={el} alt={`product ${i}`} /></li>
                                    )}
                                </ul>
                            </div>
                            <div className={styles.firstImgContainer}>
                                <img height={500} width={700} src={firstImage || product.images[0]} alt="first product" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <h2>Descripción</h2>
                        <p>{product.description}</p>
                    </div>
                </div>

                <div className={styles.rightContainer}>
                    <div className={styles.firstChild}>
                        <div className={styles.titleContainer}>
                            <h1>{product.title}</h1>
                        </div>
                        <div className={styles.priceContainer}>
                            <div>
                                <span className={styles.price}>${product.price}</span>
                            </div>
                            <div>
                                <span>en 12x de $1000 pagando con Mercado Credito</span>
                            </div>
                        </div>
                        <div className={styles.stockContainer}>
                            <div>
                                <strong>Stock disponible</strong>
                            </div>
                            <div>
                                <div className={styles.relativeStockContainer}>
                                    <button ref={$stockBtn}>Cantidad: <b>{units} unidad</b> <em>(30 disponibles)</em></button>
                                    <div className={styles.absoluteStockContainer} ref={$stockBox}>
                                            <ul className={styles.listUnits}>
                                                <li className={styles.activeLi} onClick={(e) => handlerStockClick(e, 1)}>1 unidad</li>
                                                <li onClick={(e) => handlerStockClick(e, 2)}>2 unidades</li>
                                                <li onClick={(e) => handlerStockClick(e, 3)}>3 unidades</li>
                                                <li onClick={(e) => handlerStockClick(e, 4)}>4 unidades</li>
                                                <li onClick={(e) => handlerStockClick(e, 5)}>5 unidades</li>
                                            </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <div>
                                <button className={styles.buyNowBtn}>Comprar ahora</button>
                                <button className={styles.addToCartBtn}>Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

};
