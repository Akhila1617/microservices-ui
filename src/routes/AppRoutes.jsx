import ProductListPage from "../pages/ProductListPage";
import AddProductPage from "../pages/AddProductPage";
import CartPage from "../pages/CartPage";

function AppRoutes() {
    return (
        <div>
            <ProductListPage />
            <AddProductPage />
            <CartPage />
        </div>
    );
}

export default AppRoutes;