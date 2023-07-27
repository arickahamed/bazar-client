import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authSlice";
import cartSlice from "./reducer/cartSlice";
import searchSlice from "./reducer/searchSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        search: searchSlice
    }
})

export default store;