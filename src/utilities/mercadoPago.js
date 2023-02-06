import mercadopago from "mercadopago";
import { CreatePreferencePayload, PreferencePayer, PreferenceBackUrl } from "mercadopago/models/preferences/create-payload.model";
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export default function handler(req: Request, res: Response){
    // Creacion de la preferencia
    const mercadopago = require("mercadopago");
    
    mercadopago.configure({
      access_token: API_TOKEN,
    });
    
    const { item } = req.body

    const preference: CreatePreferencePayload = {
        binary_mode: true,
        items: [
            {
                title: item.title,
                unit_price: item.price,
                picture: item.images[0],
                quantity: item.quantity,
                currency_id: "currency needed (ARS)"
            }
        ]
    }

    module.exports = {
        mercadopago
    }
}
