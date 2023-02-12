import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";
import { showNotification } from "../../ultis/notification";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const res = await axiosInstance.get('api/product')
    return res.data.products
})

export const getFilterProducts = createAsyncThunk('products/getFilterProducts', async filters => {
    const params = {
        page: filters.page,
        per_page: filters.perPage,
    }
    if(filters.brandName !== "ALL") params.brand_name = filters.brandName
    if(filters.price !== "ALL") {
        const prices = filters.price.split("-")
        if(prices[0] === "duoi") params.high = prices[1]
        else if (prices[0] === "tren") params.low = prices[1]
        else {
            params.low = prices[0]
            params.high = prices[1]
        } 
    }
    const res = await axiosInstance.get('api/product/page', { params: params })
    return {
        products: res.data.products,
        total: res.data.total
    } 
})

export const getSearchProducts = createAsyncThunk('products/getSearchProducts', async filters => {
    const params = {
        page: filters.page,
        per_page: filters.perPage,
        keyword: filters.keyword
    }
    const res = await axiosInstance.get('api/product/search', { params: params })
    return {
        products: res.data.products,
        total: res.data.total
    } 
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
        products: [],
        filterProducts: [],
        total: 0,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(getFilterProducts.fulfilled, (state, action) => {
                state.filterProducts = action.payload.products
                state.total = action.payload.total
            })
            .addCase(getSearchProducts.fulfilled, (state, action) => {
                state.filterProducts = action.payload.products
                state.total = action.payload.total
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
                showNotification("success", "Thêm mới thành công!")
            })
            .addCase(addProduct.rejected, () => {
                showNotification("error", "Thêm mới không thành công!")
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map(item => {
                    if(item.id === action.payload.id) {
                        item = action.payload
                    }
                    return item
                })
                showNotification("success", "Cập nhật thành công!")
            })
            .addCase(updateProduct.rejected, () => {
                showNotification("error", "Cập nhật không thành công!")
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(item => item.id !== action.payload)
                showNotification("success", "Xóa thành công!")
            })
            .addCase(deleteProduct.rejected, () => {
                showNotification("error", "Xóa không thành công!")
            })
    }
})

const productsReducer = productsSlice.reducer

export default productsReducer