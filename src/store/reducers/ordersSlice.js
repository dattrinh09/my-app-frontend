import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";
import { showNotification } from "../../ultis/notification";

export const getAllOrders = createAsyncThunk('orders/getAllOrders', async () => {
    const res = await axiosInstance.get('api/order')
    return res.data
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async id => {
    await axiosInstance.delete(`api/order/${id}`)
    return id
})

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        userOrders: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(item => item.id !== action.payload)
                showNotification("success", "Xoá thành công!")
            })
            .addCase(deleteOrder.rejected, () => {
                showNotification("error", "Xóa không thành công!")
            })
    }
})

const ordersReducer = ordersSlice.reducer

export default ordersReducer