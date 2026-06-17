import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsPage } from "../features/productSlice";
import { addToCart } from "../services/api";

function ProductListPage() {

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const currentPage = useSelector((state) => state.products.currentPage);
    const totalPages = useSelector((state) => state.products.totalPages);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesName = product.name
                .toLowerCase()
                .includes(searchText.toLowerCase());

            const matchesPrice = maxPrice === "" || product.price <= parseFloat(maxPrice);

            return matchesName && matchesPrice;
        });
    }, [products, searchText, maxPrice]);

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
        dispatch(fetchProductsPage({ page: 0, size: 3, sortBy: "name" }));
    }, [dispatch]);

    const goToPage = (pageNumber) => {
        dispatch(fetchProductsPage({ page: pageNumber, size: 3, sortBy: "name" }));
    };

    return (
        <div>
            <h2>Product List</h2>

            <input
                type="text"
                placeholder="Search Product"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />

            {loading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {filteredProducts.map(product => (
                <div key={product.id}>
                    {product.name} - ${product.price}
                    <button onClick={() => handleAddToCart(product.id)}>
                        Add to Cart
                    </button>
                </div>
            ))}

            <button
                disabled={currentPage === 0}
                onClick={() => goToPage(currentPage - 1)}
            >
                Prev
            </button>

            <span> Page {currentPage + 1} of {totalPages} </span>

            <button
                disabled={currentPage + 1 >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default ProductListPage;