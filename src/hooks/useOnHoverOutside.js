import { useEffect } from "react";

export function useOnHoverOutside(ref, handler) {

    useEffect( () => {  

        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target))
                return;
            
            handler();
        };

        document.addEventListener("mouseover", listener);

        return () => {
            document.removeEventListener("mouseout", listener);
        };
    }, [ref, handler]);
};
