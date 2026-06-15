import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081"
});

export default api;

export const addToCart = (productId) => {
    return api.post("http://localhost:8082/cart", {
        productId: productId,
        quantity: 1
    });
};