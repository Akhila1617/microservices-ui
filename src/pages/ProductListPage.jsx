import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";

function ProductListPage() {

    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.products.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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