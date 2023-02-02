import { useNavigate } from "react-router-dom";
import styles from "../styles/FilterSlideBar.module.css";

export default function FilterSlideBar({
  search,
  quantityResults,
  categories,
}) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate({
      pathname: "/products",
      search: "?search=" + search + "&categoryId=" + id
    });
  }

  return (
    <aside className={styles.asideSlideBar}>
      <h1>{search}</h1>
      <span>{quantityResults} resultados</span>
      <section>
        <div className={styles.contentFilter}>
          <h2>Categoria</h2>
          <ul>
            {categories.map((category, i) => (
              <li className={styles.optionItem} key={i} onClick={() => handleClick(category.id)}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.contentFilter}>
          <h2>Precio</h2>
          <div className={styles.priceContentInputs}>
            <form className={styles.searchPriceInput}>
              <input
                type="number"
                name="minimum-price"
                placeholder="Mínimo"
                maxLength="50"
                pattern="^[0-9]+([,.][0-9]+)?$"
                className={styles.inputPrice}
              />
              <span>  -  </span>
              <input
                type="number"
                name="maximum-price"
                placeholder="Máximo"
                maxLength="50"
                pattern="^[0-9]+([,.][0-9]+)?$"
                className={styles.inputPrice}
              />
            </form>
          </div>
        </div>
      </section>
    </aside>
  );
}
