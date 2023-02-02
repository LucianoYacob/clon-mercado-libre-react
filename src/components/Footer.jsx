import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footerContainer} >
            <div>
                <nav className={styles.footerNav}>
                    <ul className={styles.footerList}>
                        <li className={styles.listItem}>
                            <a href="*">Trabajá con nosotros</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="*">Términos y condiciones</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="*">Cómo cuidamos tu privacidad</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="*">Accesibilidad</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="*">Información al usuario financiero</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="*">Ayuda</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="*">Defensa del Consumidor</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="*">Información sobre seguros</a>
                        </li>
                    </ul>
                </nav>
                <small>Copyright © 1999-2023 MercadoLibre S.R.L.</small>
            </div>
            <p >Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA</p>
        </div>
    )
};
