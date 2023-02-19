import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";
import { showNotification } from "../../ultis/notification";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const res = await axiosInstance.get('api/product')
    return res.data.products
})

export const getProductByName = createAsyncThunk('products/getProductByName', async productName => {
    const res = await axiosInstance.get(`api/product/name/${productName}`)
    return res.data
})

export const getFilterProducts = createAsyncThunk('products/getFilterProducts', async filters => {
    const params = {
        page: filters.page,
        per_page: filters.perPage,
    }
    if (filters.brandName !== "ALL") params.brand_name = filters.brandName
    if (filters.price !== "ALL") {
        const prices = filters.price.split("-")
        if (prices[0] === "duoi") params.high = prices[1]
        else if (prices[0] === "tren") params.low = prices[1]
        else {
            params.low = prices[0]
            params.high = prices[1]
        }
    }
    const res = await axiosInstance.get('api/product/page', { params: params })
    return {
        page: filters.page,
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
        page: filters.page,
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
        selectedProduct: null,
        filterProducts: [],
        total: 0,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(getProductByName.fulfilled, (state, action) => {
                state.selectedProduct = action.payload
            })
            .addCase(getFilterProducts.fulfilled, (state, action) => {
                state.filterProducts = action.payload.page === 1
                    ? action.payload.products
                    : state.filterProducts.concat(action.payload.products)
                state.total = action.payload.total
            })
            .addCase(getSearchProducts.fulfilled, (state, action) => {
                state.filterProducts = action.payload.page === 1
                    ? action.payload.products
                    : state.filterProducts.concat(action.payload.products)
                state.total = action.payload.total
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
                showNotification("success", "Thêm mới thành công!", "Sản phẩm đã được thêm vào cơ sở dữ liệu.")
            })
            .addCase(addProduct.rejected, () => {
                showNotification("error", "Thêm mới không thành công!", "Sản phẩm chưa được thêm vào cơ sở dữ liệu.")
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map(item => {
                    if (item.id === action.payload.id) {
                        item = action.payload
                    }
                    return item
                })
                showNotification("success", "Cập nhật thành công!", "Sản phẩm đã được cập nhật vào cơ sở dữ liệu.")
            })
            .addCase(updateProduct.rejected, () => {
                showNotification("error", "Cập nhật không thành công!", "Sản phẩm chưa được cập nhật vào cơ sở dữ liệu.")
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(item => item.id !== action.payload)
                showNotification("success", "Xóa thành công!", "Sản phẩm đã được xóa khỏi cơ sở dữ liệu.")
            })
            .addCase(deleteProduct.rejected, () => {
                showNotification("error", "Xóa không thành công!", "Sản phẩm chưa được xáo khỏi cơ sở dữ liệu.")
            })
    }
})

const productsReducer = productsSlice.reducer

export default productsReducer