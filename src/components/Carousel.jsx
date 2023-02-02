import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Carousel.module.css";

// Refactorizar
export function Carousel({
  controls = true,
  visor = false,
  speed = "1000",
  interval = "6000",
  autoplay = true,
  children
}) {  
  const [isAutoPlay, setIsAutoPlay] = useState(autoplay);

  const slideContainer = useRef(null);
  const intervaloSlideshow = useRef(null);
  const btnL = useRef(null);
  const btnR = useRef(null);

  const next = useCallback(() => {
    if (slideContainer.current.children.length > 0) {
      const firstElement = slideContainer.current.children[0];

      slideContainer.current.style.transition = `${speed}ms ease-out all`;

      const slideSize = slideContainer.current.children[0].offsetWidth;

      slideContainer.current.style.transform = `translateX(-${slideSize}px)`;

      const transition = () => {
        slideContainer.current.style.transition = "none";
        slideContainer.current.style.transform = `translateX(0)`;

        slideContainer.current.appendChild(firstElement);

        slideContainer.current.removeEventListener("transitionend", transition);
      };

      slideContainer.current.addEventListener("transitionend", transition);
    }
  }, [speed]);

  const previous = () => {
    if (slideContainer.current.children.length > 0) {
      const index = slideContainer.current.children.length - 1;
      const lastElement = slideContainer.current.children[index];

      // elemento a insertar, posicion en donde instertar el elemento
      slideContainer.current.insertBefore(
        lastElement,
        slideContainer.current.firstChild
      );

      slideContainer.current.style.transition = "none";

      const slideSize = slideContainer.current.children[0].offsetWidth;
      
      slideContainer.current.style.transform = `translateX(-${slideSize}px)`;

      setTimeout(() => {
        slideContainer.current.style.transition = `${speed}ms ease-out all`;
        slideContainer.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  function sortUnorderedList() {
    let htmlCollection = slideContainer.current.children,
      elements = [].slice.call(htmlCollection); //convierto htmlCollection a array
 
    //Ordeno por la 2da clase de los elementos 
    elements.sort(compareClass);
  
    for (let i = 0; i < elements.length; i++) {
      slideContainer.current.appendChild(elements[i]); //añado los elementos de manera ordenada
    }
  
    function compareClass(el1, el2) {
      if (el1.classList[1] < el2.classList[1]) return -1;
      if (el1.classList[1] > el2.classList[1]) return 1;
      return 0;
    }
  }

  const selectImage = (index) => {
    if (slideContainer.current.children.length > 0) {
      const slideSize = slideContainer.current.children[0].offsetWidth;
      
      slideContainer.current.style.transition = "none";
      sortUnorderedList();

      // Necesito ordenar los componentes hijos en el padre una vez q ejecute este metodo, para que no me de problema el autoplay o las flechas de direcciones
      slideContainer.current.style.transition = `${speed}ms ease-out all`;
      slideContainer.current.style.transform = `translateX(-${slideSize*(index-1)}px)`;
    }
  }

  // Refactorizar codigo
  useEffect(() => {
    const listenerClick = (e) => {
      if (e.target.className === styles.btnLeft ||
        e.target.className === styles.btnRight ||
        e.target.className === "btnChooseImg"){
        clearInterval(intervaloSlideshow.current);   
        setIsAutoPlay(false);
      }
    };

    if (isAutoPlay) {
      intervaloSlideshow.current = setInterval(() => {
        next();
      }, interval);

      document.addEventListener("click", listenerClick);
    }

    return () => {
      clearInterval(intervaloSlideshow.current);    
      document.removeEventListener("click", listenerClick);
      autoplay && setIsAutoPlay(true);
    }
  }, [interval, next, isAutoPlay, autoplay]);


  return (
    <div className={styles.carouselContainer}>
      <div className={styles.slideContainer} ref={slideContainer}>
        { children.length != undefined 
          ? children.map((el, index) => (<div className={`${styles.carouselWrapper} ${index+1}`} key={index}>{el}</div>))
          : children
        }
        </div>

      {
        controls && 
        (<>
          <button ref={btnL} className={styles.btnLeft} onClick={previous}>
            &lt;
          </button>
          <button ref={btnR} className={styles.btnRight} onClick={next}>
            &gt;
          </button>
        </>)
      }

      { visor && 
        <div className={styles.bottomBtnContainer}>
          <button className="btnChooseImg" onClick={(e) => selectImage(1)}></button>
          <button className="btnChooseImg" onClick={(e) => selectImage(2)}></button>
          <button className="btnChooseImg" onClick={(e) => selectImage(3)}></button>
        </div>
      }
    </div>
  );
}
