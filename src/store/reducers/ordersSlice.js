import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";
import { showNotification } from "../../ultis/notification";

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
    const res = await axiosInstance.get('api/order')
    return res.data
})

export const getUserOrders = createAsyncThunk('orders/getUserOrders', async userId => {
    const res = await axiosInstance.get(`api/order/user/${userId}`)
    return res.data
}) 

export const createOrder = createAsyncThunk('orders/createOrder', async newOrder => {
    const res = await axiosInstance.post("api/order", newOrder)
    return res.data
})

export const updateOrder = createAsyncThunk('orders/updateOrder', async order => {
    const res = await axiosInstance.patch(`api/order/${order.id}`, order.data)
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
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.userOrders = action.payload
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.userOrders.push(action.payload)
                showNotification("success", "Mua thành công!", "Đơn hàng đang được xác nhận.")
            })
            .addCase(createOrder.rejected, () => {
                showNotification("error", "Mua hàng không thành công!", "Sản phẩm đã hết hàng hoặc không còn tồn tại.")
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.orders = state.orders.map(item => {
                    if (item.id === action.payload.id) {
                        item = action.payload
                    }
                    return item
                })
                showNotification("success", "Cập nhật thành công!", "Đơn hàng đã được cập nhật vào cơ sở dữ liệu.")
            })
            .addCase(updateOrder.rejected, () => {
                showNotification("error", "Xóa không thành công!", "Đơn hàng chưa được cập nhật vào cơ sở dữ liệu.")
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(item => item.id !== action.payload)
                showNotification("success", "Xoá thành công!", "Đơn hàng đã được xóa khỏi cơ sở dữ liệu.")
            })
            .addCase(deleteOrder.rejected, () => {
                showNotification("error", "Xóa không thành công!", "Đơn hàng chưa được xóa khỏi cơ sở dữ liệu.")
            })
    }
})

const ordersReducer = ordersSlice.reducer

export default ordersReducer