import { useEffect, useState } from "react";
import api from "../services/api";

function ProductListPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/product")
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Product List</h2>

            {products.map(product => (
                <div key={product.id}>
                    {product.name} - ${product.price}
                </div>
            ))}
        </div>
    );
}

export default ProductListPage;