import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        token: "",
    },
    reducers: {
        addProfile(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    }
})

export const {addProfile} = authSlice.actions;
export default authSlice.reducer;
