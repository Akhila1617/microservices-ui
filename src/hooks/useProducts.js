import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsPage } from "../features/productSlice";

export const useProducts = () => {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const currentPage = useSelector((state) => state.products.currentPage);
    const totalPages = useSelector((state) => state.products.totalPages);

    useEffect(() => {
        dispatch(fetchProductsPage({
            page: 0,
            size: 3,
            sortBy: "name"
        }));
    }, [dispatch]);

    const loadPage = (page) => {
        dispatch(fetchProductsPage({
            page,
            size: 3,
            sortBy: "name"
        }));
    };

    return {
        products,
        loading,
        error,
        currentPage,
        totalPages,
        loadPage
    };
};