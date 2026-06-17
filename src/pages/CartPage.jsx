import { useEffect, useState } from "react";
import { getCartItems } from "../services/api";

function CartPage() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getCartItems()
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Cart Page</h2>

            {cartItems.map(item => (
                <div key={item.id}>
                    Product ID: {item.productId} | Quantity: {item.quantity}
                </div>
            ))}
        </div>
    );
}

export default CartPage;