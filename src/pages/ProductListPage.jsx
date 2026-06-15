import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { addToCart } from "../services/api";

function ProductListPage() {

    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.products.products
    );


    const handleAddToCart = (productId) => {
        console.log("Clicked product:", productId);

        addToCart(productId)
            .then((response) => {
                console.log("Success:", response.data);
                alert("Product added to cart");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error adding product");
            });
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <h2>Product List</h2>

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