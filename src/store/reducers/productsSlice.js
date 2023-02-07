import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const res = await axiosInstance.get('api/product')
    return res.data.products
})

export const addProduct = createAsyncThunk('products/addProduct', async newProduct => {
    const res = await axiosInstance.post('api/product', newProduct)
    return res.data
})

export const updateProduct = createAsyncThunk('products/updateProduct', async product => {
    const res = await axiosInstance.patch(`api/product/${product.id}`, product.data)
    return res.data
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async id => {
    await axiosInstance.delete(`api/product/${id}`)
    return id
})

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map(item => {
                    if(item.id === action.payload.id) {
                        item = action.payload
                    }
                    return item
                })
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(item => item.id !== action.payload)
            })
    }
})

const productsReducer = productsSlice.reducer

export default productsReducer