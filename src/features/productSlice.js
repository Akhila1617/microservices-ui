import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await api.get("/product");
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    }
});

export default productSlice.reducer;