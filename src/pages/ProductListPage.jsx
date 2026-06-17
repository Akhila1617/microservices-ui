import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { addToCart } from "../services/api";

function ProductListPage() {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const handleAddToCart = (productId) => {
        addToCart(productId)
            .then(() => {
                alert("Product added to cart");
            })
            .catch(() => {
                alert("Error adding product");
            });
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <h2>Product List</h2>

            {loading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {products.map(product => (
                <div key={product.id}>
                    {product.name} - ${product.price}
                    <button onClick={() => handleAddToCart(product.id)}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProductListPage;