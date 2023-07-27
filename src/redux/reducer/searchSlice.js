import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        result: []
    },
    reducers: {
        addResult(state, action) {
            state.result = action.payload;
        }
    }
})

export const { addResult} = searchSlice.actions;
export default searchSlice.reducer;