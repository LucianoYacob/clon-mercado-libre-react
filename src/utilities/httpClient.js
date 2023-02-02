const API_URL = "https://api.escuelajs.co/api/v1/";
// const API_TOKEN = "";

export default function get(endpoint = "") {
    return fetch(API_URL + endpoint)
        .then( res => res.json());
}