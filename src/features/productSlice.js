import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await api.get("/product");
        return response.data;
    }
);

export const fetchProductsPage = createAsyncThunk(
    "products/fetchProductsPage",
    async ({ page, size, sortBy }) => {
        const response = await api.get(`/product/page?page=${page}&size=${size}&sortBy=${sortBy}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
        currentPage: 0,
        totalPages: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load products";
            })
            .addCase(fetchProductsPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.content;
                state.currentPage = action.payload.number;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchProductsPage.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load products";
            });
    }
});

export default productSlice.reducer;