import { configureStore } from "@reduxjs/toolkit"
import brandsReducer from "./reducers/brandsSlice"
import productsReducer from "./reducers/productsSlice"
import ordersReducer from "./reducers/ordersSlice"

const store = configureStore({
    reducer: {
        productsReducer,
        brandsReducer,
        ordersReducer
    }
})

export default store