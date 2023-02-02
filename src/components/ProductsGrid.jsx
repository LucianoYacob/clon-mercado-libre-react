import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "../styles/ProductsGrid.module.css";
import { useRef } from "react";
import orderItemsForPrice from "../utilities/orderItemsForPrice";

export default function ProductsGrid({ products }) {
  const $optionContainer = useRef(null);
  const $optionBtn = useRef(null);
  const [order, setOrder] = useState("relevant");

  // TO DO, hace un componente que contenga tanto la logica como los elementos de opciones y pasarlo por children a ProductGrid

  const handlerOptionClick = (e) => {
    const $clickedOption = document.getElementsByClassName(
      styles.optionClicked
    )[0];
    $clickedOption.classList.remove(styles.optionClicked);
    e.currentTarget.className += " ".concat(styles.optionClicked);
  };

  const handlerOptionDisplay = (e) => {
    $optionContainer.current.style.display = "block";
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target !== $optionBtn.current && $optionContainer.current !== null)
        $optionContainer.current.style.display = "none";
    });
  }, []);

  return (
    <section className={styles.results}>
      <div className={styles.viewOptionsContainer}>
        <div>
          <div className={styles.viewOptionsSpanC}>
            <span>Ordenar por</span>
          </div>

          <div className={styles.viewOptionsBtnC}>
            <div>
              <button
                className={styles.viewOptionsBtn}
                ref={$optionBtn}
                onClick={handlerOptionDisplay}
              >
                <span>
                  {order === "relevant"
                    ? "Más relevante"
                    : order === "less"
                        ? "Menor precio"
                        : "Mayor precio"}
                </span>
                <i>{/*Aca va la flecha*/}</i>
              </button>
              <div className={styles.optionsContainer} ref={$optionContainer}>
                <div>
                  <ul className={styles.optionsList}>
                    <li
                      className={
                        styles.option + " ".concat(styles.optionClicked)
                      }
                      onClick={(e) => {
                        handlerOptionClick(e);
                        setOrder("relevant");
                      }}
                    >
                      Más relevantes
                    </li>
                    <li
                      className={styles.option}
                      onClick={(e) => {
                        handlerOptionClick(e);
                        setOrder("less");
                      }}
                    >
                      Menor precio
                    </li>
                    <li
                      className={styles.option}
                      onClick={(e) => {
                        handlerOptionClick(e);
                        setOrder("high");
                      }}
                    >
                      Mayor precio
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ol className={styles.productsContainer}>
        {order === "relevant"
          ? products.map((product) => (
              <ProductCard
                id={product.id}
                imgURL={product.images[0]}
                description={product.description}
                price={product.price}
                key={product.id}
                widthHeight={275}
                hoverAction={false}
              />
            ))
          : order === "less"
          ? orderItemsForPrice(products, "<").map((product) => (
              <ProductCard
                id={product.id}
                imgURL={product.images[0]}
                description={product.description}
                price={product.price}
                key={product.id}
                widthHeight={275}
                hoverAction={false}
              />
            ))
          : orderItemsForPrice(products, ">").map((product) => (
              <ProductCard
                id={product.id}
                imgURL={product.images[0]}
                description={product.description}
                price={product.price}
                key={product.id}
                widthHeight={275}
                hoverAction={false}
              />
            ))}
      </ol>
    </section>
  );
}
