import { AiOutlineSearch } from "react-icons/ai";
import styles from "../styles/Search.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

export function Search() {
  const inputRef = useRef(null);
  const [query] = useSearchParams();
  const search = query.get("search");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.elements.searcher.value;
    
    navigate({
      pathname: "/products",
      search: "?search=" + value
    });
  };

  useEffect(() => {
    inputRef.current.value = search
  }, [search])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.containerInput}>
        <input
          autoComplete="off"
          className={styles.search}
          type="text"
          name="searcher"
          placeholder="Buscar productos, marcas y más..."
          aria-label="Search Products"
          ref={inputRef}
        />
        <button className={styles.btnSearch} type="submit">
          <AiOutlineSearch className={styles.logo} size={20} color="black" />
        </button>
      </div>
    </form>
  );
}
