import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../requests/axiosInstance";

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const res = await axiosInstance.get('api/user')
    return res.data
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
    }
})

const usersReducer = usersSlice.reducer

export default usersReducer