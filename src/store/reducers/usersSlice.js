import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";
import { showNotification } from "../../ultis/notification";

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const res = await axiosInstance.get('api/user')
    return res.data
})

export const deleteUser = createAsyncThunk('users/deleteUser', async id => {
    await axiosInstance.delete(`api/user/${id}`)
    return id 
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(item => item.id !== action.payload)
            showNotification("success", "Xoá thành công!", "Người dùng đã được xóa khỏi cơ sở dữ liệu.")
        })
        .addCase(deleteUser.rejected, () => {
            showNotification("error", "Xoá không thành công!", "Người dùng chưa được xóa khỏi cơ sở dữ liệu.")
        })
    }
})

const usersReducer = usersSlice.reducer

export default usersReducer