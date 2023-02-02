import { Link } from "react-router-dom";
import styles from "../styles/Banner.module.css";

export function Banner({ img }) {
    // Verificar si es necesario el div, xq ya hay un div en el carrusel q contiene al Link
    return (
    // <div className={`${styles.carouselWrapper} ${pos}`}>
        <Link>
          <img
            className={styles.carouselImg}
            src={require(`../images/${img}`)}
            alt="Advertisement"
          />
        </Link>
    // </div>
    )
};
