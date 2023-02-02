import { Link } from "react-router-dom";
import styles from "../styles/SimpleHeader.module.css"; 
import { BsQuestionCircle } from "react-icons/bs";

export default function SimpleHeader() {
    return (
        <div className={styles.container}>
            <Link to={"/"} replace={true}>
                <img className={styles.image} src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.16/mercadolibre/logo__large_plus.png" alt="logo mercado libre" />
            </Link>
            <div className={styles.icon}>
                <BsQuestionCircle size={20} color={"#333"}/>
            </div>
        </div>
    
    )
};
