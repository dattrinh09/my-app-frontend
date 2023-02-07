import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../requests/axiosInstance"

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
        severity: "",
        message: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.fulfilled, (state, action) => {
                state.brands = action.payload
                state.severity = ""
                state.message = ""
            })
            .addCase(addBrand.fulfilled, (state, action) => {
                state.brands.push(action.payload)
                state.severity = "success"
                state.message = "Thêm mới thành công!"
            })
            .addCase(addBrand.rejected, (state) => {
                state.severity = "error"
                state.message = "Tên đã tồn tại!"
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.brands = state.brands.map(item => {
                    if (item.id === action.payload.id) {
                        item = action.payload
                    }
                    return item
                })
                state.severity = "success"
                state.message = "Cập nhật thành công!"
            })
            .addCase(updateBrand.rejected, (state) => {
                state.severity = "error"
                state.message = "Tên đã tồn tại!"
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.brands = state.brands.filter(item => item.id !== action.payload)
                state.status = "success"
                state.message = "Xóa thành công!"
            })
    }
})

const brandsReducer = brandsSlice.reducer

export default brandsReducer