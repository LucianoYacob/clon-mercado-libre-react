import ProductsGrid from "../components/ProductsGrid";
import FilterSlideBar from "../components/FilterSlideBar";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import get from "../utilities/httpClient";
import styles from "../styles/SearchPage.module.css";

export default function SearchPage() {
  // Hacer un componente de carga
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [query] = useSearchParams();
  const title = query.get("search");
  const category = query.get("categoryId");

  // Parametros de busqueda
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(99999999);

  const getCategories = () => {
    let categories = [];

    products.forEach((product, i) => {
      const nameCategory = product.category.name;
      const idCategory = product.category.id;
      if (!categories.some((category) => category.name === nameCategory)) {
        categories = [...categories, { name: nameCategory, id: idCategory }];
      }
    });

    return categories;
  };

  useEffect(() => {
    setIsLoading(true);

    const searchUrl = (title ? "?title=" + title + "&" : "?") + (category ? "categoryId=" + category : "");

    get("products/" + searchUrl).then((data) => {
      setProducts(data);
    });

    setIsLoading(false);
    
  }, [title, category]);

  return (
    <div className={styles.searchMainContainer}>
      <div className={styles.searchMain}>
        <FilterSlideBar
          search={title}
          quantityResults={products.length}
          categories={getCategories()}
        />
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}
