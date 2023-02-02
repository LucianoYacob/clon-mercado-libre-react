import { useEffect, useState } from "react";
import { Banner } from "../components/Banner";
import { Carousel } from "../components/Carousel";
import { ProductsList } from "../components/ProductsList";
import styles from "../styles/HomePage.module.css";

import get from "../utilities/httpClient";

export function HomePage({setAccess}) {
    const images = ["slade_1.webp", "slade_2.webp", "slade_3.webp"];

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        setAccess(false);

        return () => get("products/").then(data => {
            setProducts(data);
        });
    }, [setAccess]);

    return (
        <>
            <section className={styles.presentationBanner}>
                <div className={styles.wrapper_1600px}>
                    <Carousel visor={ true } >
                        <Banner img={`${images[0]}`} />
                        <Banner img={`${images[1]}`} />
                        <Banner img={`${images[2]}`} />
                    </Carousel>
                </div>
            </section>
            <section className={styles.ofertas}>
                <div className={styles.wrapper_1200px}>
                    <div className={styles.listContainer}>
                        <h2>Ofertas</h2>
                        <Carousel autoplay={false} speed="500">
                            <ProductsList products={products.slice(0, 5)}/>
                            <ProductsList products={products.slice(5, 10)} />
                        </Carousel>
                    </div>
                    <div className={styles.listContainer}>
                        <h2>Más vendidos</h2>
                        <Carousel autoplay={false} speed="500">
                            <ProductsList products={products.slice(10, 15)}/>
                            <ProductsList products={products.slice(15, 20)} />
                        </Carousel>
                    </div>
                </div>
            </section> 
        </>
    )
};
