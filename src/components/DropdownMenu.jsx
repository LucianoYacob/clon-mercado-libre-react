import styles from "../styles/DropdownMenu.module.css";
import { Link } from "react-router-dom";

export function DropdownMenu({ data }) {

  return (
    <nav>
      <ul className={styles.dropdownMenu} >
        { data.map((category, i) => <li key={category.id} handleClick><Link to={`/products?categoryId=${category.id}`}>{category.name}</Link></li>) }
      </ul>
    </nav>
  );
}
