import { configureStore } from "@reduxjs/toolkit"
import brandsReducer from "./reducers/brandsSlice"
import productsReducer from "./reducers/productsSlice"

const store = configureStore({
    reducer: {
        productsReducer,
        brandsReducer
    }
})

export default store