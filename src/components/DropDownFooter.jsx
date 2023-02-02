import { useEffect, useRef, useState } from "react";
import styles from "../styles/DropDownFooter.module.css";

export default function DropDownFooter() {
    const [collapse, setCollapse] = useState(true);
    const menu = useRef(null);
    const timeCollapse = "200";

    const handlerCollapse = (e) => {
        if (e.target.id === "footer-flanger"){
            setCollapse(!collapse);
        }
    }

    // Ejecuto la accion de abrir el menu y desplazar la pagina hasta su limite inferior
    useEffect(() => {
        if (!collapse) {
            menu.current.style.height = "235px";
            setTimeout(() => {
                menu.current.children[1].style.display = "flex";
                setTimeout(() => {
                    window.scrollTo({top:document.body.scrollHeight});
                }, 100)
            }, timeCollapse);
        }
        else{
            menu.current.children[1].style.display = "none";
            menu.current.style.height = "0";
        }
    }, [collapse])

    return (
        <div ref={menu} className={styles.menuAccess}>
            <label id="footer-flanger" htmlFor="menuAccessContainer" onClickCapture={(e) => handlerCollapse(e)}>
                Más Información
                <i  className={`${styles.iconAccess}  ${(collapse ? styles.collapse : styles.noCollapse)}`}></i>
            </label>
            <div className={styles.menuAccessContent}>
                <div className={styles.menuAccessCol}>
                    <h3>Acerca de</h3>
                    <ul className={styles.menuAccessList}>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Mercado Libre</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Investor relations</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Tendencias</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Sustentabilidad</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.menuAccessCol}>
                    <h3>Otros sitios</h3>
                    <ul className={styles.menuAccessList}>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Developers</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Mercado Pago</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Mercado Shops</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Mercado Envíos</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Mercado Ads</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.menuAccessCol}>
                    <h3>Ayuda</h3>
                    <ul className={styles.menuAccessList}>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Comprar</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Vender</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Resolución de problemas</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Centro de seguridad</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.menuAccessCol}>
                    <h3>Redes sociales</h3>
                    <ul className={styles.menuAccessList}>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Twitter</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Facebool</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Instagram</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Youtube</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.menuAccessCol}>
                    <h3>Mi cuenta</h3>
                    <ul className={styles.menuAccessList}>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Ingresá</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Vender</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.menuAccessCol}>
                    <h3>Mercado Puntos</h3>
                    <ul className={styles.menuAccessList}>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Nivel 6</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Disney+</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Star+</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">HBO MAX</a>
                        </li>
                        <li className={styles.menuAccessItem}>
                            <a href="#" rel="follow">Paramount+</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};
