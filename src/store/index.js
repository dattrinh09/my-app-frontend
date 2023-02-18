import { configureStore } from "@reduxjs/toolkit"
import brandsReducer from "./reducers/brandsSlice"
import productsReducer from "./reducers/productsSlice"
import ordersReducer from "./reducers/ordersSlice"
import usersReducer from "./reducers/usersSlice"

const store = configureStore({
    reducer: {
        productsReducer,
        brandsReducer,
        ordersReducer,
        usersReducer
    }
})

export default store