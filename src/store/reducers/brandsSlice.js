import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../requests/axiosInstance"
import { showNotification } from "../../ultis/notification"

export const getBrands = createAsyncThunk('brands/getBrands', async () => {
    const res = await axiosInstance.get('api/brand')
    return res.data
})

export const addBrand = createAsyncThunk('brands/addBrand', async newBrand => {
    const res = await axiosInstance.post('api/brand', newBrand)
    return res.data
})

export const updateBrand = createAsyncThunk('brands/updateBrand', async brand => {
    const res = await axiosInstance.patch(`api/brand/${brand.id}`, brand.data)
    return res.data
})

export const deleteBrand = createAsyncThunk('brands/deleteBrand', async id => {
    await axiosInstance.delete(`api/brand/${id}`)
    return id
})

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        brands: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.fulfilled, (state, action) => {
                state.brands = action.payload
            })
            .addCase(addBrand.fulfilled, (state, action) => {
                state.brands.push(action.payload)
                showNotification("success", "Thêm mới thành công!")
            })
            .addCase(addBrand.rejected, () => {
                showNotification("error", "Thêm mới không thành công!")
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.brands = state.brands.map(item => {
                    if (item.id === action.payload.id) {
                        item = action.payload
                    }
                    return item
                })
                showNotification("success", "Cập nhật thành công!")
            })
            .addCase(updateBrand.rejected, () => {
                showNotification("error", "Cập nhật không thành công!")
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.brands = state.brands.filter(item => item.id !== action.payload)
                showNotification("success", "Xóa thành công!")
            })
            .addCase(deleteBrand.rejected, () => {
                showNotification("error", "Xóa không thành công!")
            })
    }
})

const brandsReducer = brandsSlice.reducer

export default brandsReducer