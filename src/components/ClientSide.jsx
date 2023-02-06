import { useEffect } from "react";
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export default function ClientSide() {
    useEffect(() => {
        const fetchCheckout = async () => {
            cons response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                 
                }),
            })

            const data = await response.json();
            
            console.log(data)
            if(data.global) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://sdk.mercadopago.com/js/v2";
                script.setAttribute("data-preference-id", data.global);
                document.body.appendChild(script);
                
                const mp = new window.MercadoPago(API_TOKEN, {
                    locale: "es-AR"
                });

                mp.checkout({
                    preference: {
                        id: data.global
                    },
                    render: {
                        container: ".cho-container",
                        label: "Pagar"
                    }
                });
            }
        }

        fetchCheckout();
    }, []);

    return (
        <>
            <div className="cho-container"></div>
        </>
    )
};
