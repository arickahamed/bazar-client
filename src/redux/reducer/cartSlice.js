import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        allProducts: [],
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        totalPrice: localStorage.getItem("totalPrice")
            ? JSON.parse(localStorage.getItem("totalPrice"))
            : 0,
        uniqueQuantity: 0,
    },
    reducers: {
        addAllProducts(state, action) {
            state.allProducts.push(action.payload);
        },
        addProduct(state, action) {
            const itemInCart = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (itemInCart >= 0) {
                state.cartItems[itemInCart].quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                state.uniqueQuantity++;
            }
            state.totalPrice += action.payload.price;

            // cart items will be stored at the local-storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem(
                "totalPrice",
                JSON.stringify(state.totalPrice)
            );
        },
        removeProduct(state, action) {
            const removeItem = state.cartItems.findIndex((item) => item._id === action.payload._id);
            if(state.cartItems[removeItem].quantity > 1) {
                state.cartItems[removeItem].quantity --;
            }else {
                const eraseItem = state.cartItems.filter((item) => item._id !== action.payload._id);
                state.cartItems = eraseItem;
            }
            state.totalPrice -= action.payload.price;

            // update the local-storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
        },
    },
});

export const { addAllProducts, addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
