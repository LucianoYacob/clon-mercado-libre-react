// Ordenar los items por precio

export default function orderItemsForPrice(items, modo = ">") {
    const newArray = items.slice();

    if(modo === "<"){
        newArray.sort(function(el1, el2){
            if(el1.price > el2.price)
                return 1;
            else if(el1.price < el2.price)
                return -1;
            
            return 0;
        });
    }
    else{
        newArray.sort((el1, el2) => {
            if(el1.price > el2.price)
                return -1;
            else if(el1.price < el2.price)
                return 1;
            
            return 0;
        });
    }

    return newArray;
};
