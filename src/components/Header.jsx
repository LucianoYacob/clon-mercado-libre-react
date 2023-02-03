import { Search } from "./Search";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { GoThreeBars } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../styles/Header.module.css";
import { DropdownMenu } from "./DropdownMenu";
import { useContext, useEffect, useRef, useState } from "react";
import { useOnHoverOutside } from "../hooks/useOnHoverOutside";
import get from "../utilities/httpClient";
import { CartContext } from "../contexts/ShoppingCartContext";

export function Header({ user, setUser }) {
  const dropdownRef = useRef(null);
  const [isMenuDropDownOpen, setIsMenuDropDownOpen] = useState(false);
  const [isMenuDropDownOpenMobile, setIsMenuDropDownOpenMobile] =
    useState(false);

  const [cart, setCart] = useContext(CartContext);
  const quantity = cart.reduce((acc, el) => {
    return acc + el.quantity
  }, 0);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    get("categories").then((data) => {
      setCategories(data);
    });
  }, []);

  const closeHoverMenu = () => {
    setIsMenuDropDownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerUp}>
          <Link to="/">
            <img
              width={134}
              src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.16/mercadolibre/logo__large_plus.png"
              alt="logo mercado libre"
            />
          </Link>
          <Search />
          <Link to="/">
            <img
              width={350}
              src="https://http2.mlstatic.com/D_NQ_887100-MLA50801817839_072022-OO.webp"
              alt="logo disney hbo premium"
            />
          </Link>
        </div>
        <div className={styles.headerDown}>
          <div className={styles.containerUbication}>
            <IoLocationOutline size={28} color="#333333bb" />
            <div className={styles.containerTextUbication}>
              <p>Enviar a </p>
              <span>Capita Federal</span>
            </div>
          </div>
          <div>
            <ul className={styles.firstMenu}>
              <li
                ref={dropdownRef}
                onMouseOver={() => setIsMenuDropDownOpen(true)}
              >
                <span className={styles.categoriesSpan}>Categorias</span>
                <div
                  className={styles.mouseOverHelper}
                  hidden={!isMenuDropDownOpen}
                ></div>
                {/* false, NO renderizo DropdownMenu  */}
                {/* true, renderizo DropdownMenu  */}
                {isMenuDropDownOpen && <DropdownMenu data={categories} />}
              </li>
              <li>
                <Link to="/">Ofertas</Link>
              </li>
              <li>
                <Link to="/">Historial</Link>
              </li>
              <li>
                <Link to="/">Supermercado</Link>
              </li>
              <li>
                <Link to="/">Moda</Link>
              </li>
              <li>
                <Link to="/">Vender</Link>
              </li>
              <li>
                <Link to="/">Ayuda</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className={styles.userList}>
              <li>
                {!user ? (
                  <Link to="/register"> Crea tu cuentá </Link>
                ) : (
                  <Link to="/">{user}</Link>
                )}
              </li>
              <li>
                {!user ? (
                  <Link to="/login"> Ingresá </Link>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={(e) => setUser("")}
                  >
                    Salir
                  </span>
                )}
              </li>
              <li>
                <Link>Mis Compras</Link>
              </li>
              <li>
                <button className={styles.notificationButton}>
                  <VscBell size={22} />
                </button>
              </li>
              <li className={styles.iconCart}>
                <Link to={"/cart"}>
                  <AiOutlineShoppingCart size={22} />
                  <span className={styles.amountBuy}>{quantity}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Header Mobile */}
      <div className={styles.headerMobileContainer}>
        <div className={styles.headerUpM}>
          <div className={styles.headerUpContainer}>
            <div className={styles.headerImgContainerM}>
              <Link to="/">
                <img
                  width={134}
                  src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.16/mercadolibre/logo__large_plus.png"
                  alt="logo mercado libre"
                />
              </Link>
            </div>
            <div className={styles.headerSearchContainerM}>
              <Search className={styles.headerSearchInputM} />
            </div>
            <div className={styles.headericonContainerM}>
              <button
                onClick={(e) => {
                  console.log(isMenuDropDownOpenMobile);
                  setIsMenuDropDownOpenMobile(!isMenuDropDownOpenMobile);
                }}
              >
                <GoThreeBars size={25} color="#333333dd" />
              </button>
            </div>
            <div className={`${styles.headericonContainerM} ${styles.iconCart}`}>
              <Link to={"/cart"}>
                <AiOutlineShoppingCart size={25} color="#333333dd" />
                <span className={styles.amountBuy}>{quantity}</span>
              </Link>
            </div>
          </div>
          { isMenuDropDownOpenMobile && 
            <nav className={styles.headerDropDownM}>
              <ul className={styles.dropDownListM}>
                <li className={styles.listItemM}>
                  <Link to={"/"}>Inicio</Link>
                </li>
                <li className={styles.listItemM}>
                  {!user ? (
                    <Link to={"/login"}>Ingresar</Link>
                  ) : (
                    <Link to="/">{user}</Link>
                  )}
                </li>
                <li className={styles.listItemM}>
                  {!user ? (
                    <Link to={"/register"}>Registrarse</Link>
                  ) : (
                    <span onClick={(e) => setUser("")}>Salir</span>
                  )}
                </li>
                <li className={styles.listItemM}>
                  <h1>Categorias</h1>
                  <ul className={styles.categoryListM}>
                    <li>Ropa</li>
                    <li>Electronica</li>
                    <li>Otros</li>
                  </ul>
                </li>
              </ul>
            </nav>
          }
        </div>
        <div className={styles.headerDownMobile}>
          <div className={styles.containerDown}>
            <IoLocationOutline size={16} />
            <span>Enviar a Capital Federal</span>
          </div>
        </div>
      </div>
    </>
  );
}
